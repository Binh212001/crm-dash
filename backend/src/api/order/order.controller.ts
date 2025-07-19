import { OffsetPaginatedDto } from "@/common/dto/offset-pagination/paginated.dto";
import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { ListOrderDto } from "./dto/list-order.dto";
import { OrderResponseDto } from "./dto/order-response.dto";
import { OrderStatus } from "./entities/order.entity";
import { OrderService } from "./order.service";

@Controller("orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() data: CreateOrderDto): Promise<OrderResponseDto> {
    return this.orderService.create(data);
  }

  @Get()
  async findAll(
    @Query() dto: ListOrderDto
  ): Promise<OffsetPaginatedDto<OrderResponseDto>> {
    return this.orderService.findAll(dto);
  }

  @Get("overview")
  async getOrderOverview() {
    const res = this.orderService.getOrderOverview();
    return res;
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<OrderResponseDto> {
    return this.orderService.findOne(id);
  }

  @Put(":id/status")
  async updateStatus(
    @Param("id") id: string,
    @Body() data: { status: OrderStatus }
  ): Promise<OrderResponseDto> {
    return this.orderService.updateStatus(id, data.status);
  }
}
