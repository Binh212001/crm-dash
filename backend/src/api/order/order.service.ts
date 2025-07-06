import { BaseService } from "@/api/base/base.service";
import { OffsetPaginatedDto } from "@/common/dto/offset-pagination/paginated.dto";
import { paginate } from "@/utils/offset-pagination";
import { Injectable } from "@nestjs/common";
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
    private readonly orderItemRepository: OrderItemRepository
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

    if (dto.customerId) {
      queryBuilder.andWhere("order.customerId = :customerId", {
        customerId: dto.customerId,
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
      relations: ["customer", "user", "items", "items.productVariant"],
    });

    if (!order) {
      throw new Error("Order not found");
    }

    return plainToInstance(OrderResponseDto, order);
  }

  async create(dto: CreateOrderDto): Promise<OrderResponseDto> {
    const { items, ...orderData } = dto;

    // Generate order number if not provided
    if (!orderData.orderNumber) {
      orderData.orderNumber = this.generateOrderNumber();
    }

    const order = this.orderRepository.create(orderData);
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
    if (status === OrderStatus.SHIPPED) {
      updateData.shippedAt = new Date();
    } else if (status === OrderStatus.DELIVERED) {
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
}
