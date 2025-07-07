import { BaseService } from "@/api/base/base.service";
import { OffsetPaginatedDto } from "@/common/dto/offset-pagination/paginated.dto";
import { paginate } from "@/utils/offset-pagination";
import { BadRequestException, Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { ILike } from "typeorm";
import { CreateOrderDto } from "./dto/create-order.dto";
import { ListOrderDto } from "./dto/list-order.dto";
import { OrderResponseDto } from "./dto/order-response.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import {
  OrderEntity,
  OrderStatus,
  PaymentStatus,
} from "./entities/order.entity";
import { OrderItemRepository } from "./repositories/order-item.repository";
import { OrderRepository } from "./repositories/order.repository";
import { DeleteBaseResDto } from "../base/dto/delete-base.res.dto";
import { CustomerRepository } from "../customer/customer.repository";
import { UserRepository } from "../user/user.repository";
import { OrderOverviewDto } from "./dto/order-overview.dto";

@Injectable()
export class OrderService extends BaseService<
  OrderEntity,
  OrderResponseDto,
  CreateOrderDto,
  UpdateOrderDto,
  ListOrderDto
> {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderItemRepository: OrderItemRepository,
    private readonly customerRepository: CustomerRepository,
    private readonly userRepository: UserRepository
  ) {
    super(orderRepository);
  }

  async findAll(
    dto: ListOrderDto
  ): Promise<OffsetPaginatedDto<OrderResponseDto>> {
    const queryBuilder = this.orderRepository
      .createQueryBuilder("order")
      .leftJoinAndSelect("order.customer", "customer")
      .leftJoinAndSelect("order.user", "user")
      .leftJoinAndSelect("order.items", "items")
      .leftJoinAndSelect("items.product", "product")
      .orderBy("order.createdAt", "DESC");

    if (dto.search) {
      queryBuilder.where([
        { orderNumber: ILike(`%${dto.search}%`) },
        { notes: ILike(`%${dto.search}%`) },
        { trackingNumber: ILike(`%${dto.search}%`) },
      ]);
    }

    if (dto.status) {
      queryBuilder.andWhere("order.status = :status", { status: dto.status });
    }

    if (dto.createdAt) {
      queryBuilder.andWhere("order.createdAt = :createdAt", {
        createdAt: dto.createdAt,
      });
    }

    const [orders, meta] = await paginate<OrderEntity>(queryBuilder, dto, {
      skipCount: false,
      takeAll: false,
    });

    return new OffsetPaginatedDto(
      plainToInstance(OrderResponseDto, orders),
      meta
    );
  }

  async findOne(id: string): Promise<OrderResponseDto> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ["customer", "user", "items"],
    });

    if (!order) {
      throw new Error("Order not found");
    }

    return plainToInstance(OrderResponseDto, order);
  }

  async create(dto: CreateOrderDto): Promise<OrderResponseDto> {
    const { items, customerId, userId, ...orderData } = dto;

    // Generate order number if not provided
    if (!orderData.orderNumber) {
      orderData.orderNumber = this.generateOrderNumber();
    }

    const checkCustomer = await this.customerRepository.existsBy({
      id: customerId,
    });
    if (!checkCustomer) {
      throw new BadRequestException("Customer not found");
    }
    const checkUser = await this.userRepository.existsBy({ id: userId });
    if (!checkUser) {
      throw new BadRequestException("User not found");
    }
    const order = this.orderRepository.create({
      ...orderData,
      customer: { id: customerId },
      user: { id: userId },
    });
    const savedOrder = await this.orderRepository.save(order);

    // Create order items
    if (items && items.length > 0) {
      const orderItems = items.map((item) =>
        this.orderItemRepository.create({
          ...item,
          order: savedOrder,
          product: {
            id: item.productId,
          },
        })
      );

      await this.orderItemRepository.save(orderItems);
    }

    // Reload order with items
    const completeOrder = await this.orderRepository.findOne({
      where: { id: savedOrder.id },
      relations: ["customer", "user", "items"],
    });

    return plainToInstance(OrderResponseDto, completeOrder);
  }

  async update(id: string, dto: UpdateOrderDto): Promise<OrderResponseDto> {
    const { items, ...orderData } = dto;

    await this.orderRepository.findOneByOrFail({ id });
    await this.orderRepository.update(id, orderData);

    // Update order items if provided
    if (items !== undefined) {
      // Remove existing items
      await this.orderItemRepository.delete({ order: { id } });

      // Create new items
      if (items.length > 0) {
        const orderItems = items.map((item) => ({
          ...item,
          orderId: id,
        }));

        await this.orderItemRepository.save(orderItems);
      }
    }

    const updatedOrder = await this.orderRepository.findOne({
      where: { id },
      relations: ["customer", "user", "items"],
    });

    return plainToInstance(OrderResponseDto, updatedOrder);
  }

  async updateStatus(
    id: string,
    status: OrderStatus
  ): Promise<OrderResponseDto> {
    const order = await this.orderRepository.findOneByOrFail({ id });

    const updateData: any = { status };

    // Update timestamps based on status
    // Only update shippedAt/deliveredAt if the status is being set to the correct enum value
    if (status === OrderStatus.PROCESSING) {
      updateData.shippedAt = new Date();
    } else if (status === OrderStatus.COMPLETED) {
      updateData.deliveredAt = new Date();
    }

    await this.orderRepository.update(id, updateData);

    const updatedOrder = await this.orderRepository.findOne({
      where: { id },
      relations: ["customer", "user", "items"],
    });

    return plainToInstance(OrderResponseDto, updatedOrder);
  }

  async remove(id: string): Promise<DeleteBaseResDto> {
    const res = await this.orderRepository.softDelete(id);
    return { data: !!res.affected };
  }

  private generateOrderNumber(): string {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    return `ORD-${timestamp}-${random}`;
  }

  /**
   * Get order overview statistics: total orders, completed, pending, total revenue
   * Đếm chính xác completed, pending, và tổng số order, tổng doanh thu (tất cả orders)
   */
  async getOrderOverview(): Promise<OrderOverviewDto> {
    // Đếm tổng số orders
    const totalOrders = await this.orderRepository.count();

    // Đếm số order completed
    const completed = await this.orderRepository.count({
      where: { status: OrderStatus.COMPLETED },
    });

    // Đếm số order pending
    const pending = await this.orderRepository.count({
      where: { status: OrderStatus.PENDING },
    });

    // Tổng doanh thu: sum của tất cả order.total (không chỉ completed)
    const { sum } = await this.orderRepository
      .createQueryBuilder("order")
      .select("SUM(order.total)", "sum")
      .getRawOne();

    const totalRevenue = Number(sum) || 0;

    return {
      totalOrders,
      completed,
      pending,
      totalRevenue,
    };
  }
}
