import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderItemRepository } from './repositories/order-item.repository';
import { OrderRepository } from './repositories/order.repository';

@Module({
  imports: [],
  providers: [
    OrderRepository,
    OrderItemRepository,
    OrderService,
  ],
  controllers: [OrderController],
  exports: [OrderService, OrderRepository, OrderItemRepository],
})
export class OrderModule {} 