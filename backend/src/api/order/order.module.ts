import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderItemRepository } from './repositories/order-item.repository';
import { OrderRepository } from './repositories/order.repository';
import { CustomerModule } from '../customer/customer.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    CustomerModule,
    UserModule
  ],
  providers: [
    OrderRepository,
    OrderItemRepository,
    OrderService,
  ],
  controllers: [OrderController],
  exports: [OrderService, OrderRepository, OrderItemRepository],
})
export class OrderModule {} 