import {
  StringFieldOptional,
  EnumFieldOptional,
  NumberField,
  NumberFieldOptional,
  UUIDFieldOptional,
  ClassField,
} from '@/decorators/field.decorators';
import { CreateBaseReqDto } from '@/api/base/dto/create-base.req.dto';
import { CreateOrderItemDto } from './create-order-item.dto';
import { OrderStatus, PaymentStatus } from '../entities/order.entity';

export class CreateOrderDto extends CreateBaseReqDto {
  @StringFieldOptional({ maxLength: 50 })
  orderNumber?: string;

  @EnumFieldOptional(() => OrderStatus)
  status?: OrderStatus;

  @EnumFieldOptional(() => PaymentStatus)
  paymentStatus?: PaymentStatus;

  @NumberField({ min: 0 })
  subtotal: number;

  @NumberFieldOptional({ min: 0 })
  tax?: number;

  @NumberFieldOptional({ min: 0 })
  shipping?: number;

  @NumberField({ min: 0 })
  total: number;

  @UUIDFieldOptional()
  customerId?: string;

  @UUIDFieldOptional()
  userId?: string;

  @StringFieldOptional()
  notes?: string;

  @StringFieldOptional()
  shippingAddress?: string;

  @StringFieldOptional()
  billingAddress?: string;

  @ClassField(() => CreateOrderItemDto, { each: true })
  items: CreateOrderItemDto[];
}