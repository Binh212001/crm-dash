import { CreateBaseReqDto } from "@/api/base/dto/create-base.req.dto";
import {
  ClassField,
  EnumFieldOptional,
  NumberField,
  NumberFieldOptional,
  StringFieldOptional,
  UUIDFieldOptional,
} from "@/decorators/field.decorators";
import { OrderStatus } from "../entities/order.entity";
import { CreateOrderItemDto } from "./create-order-item.dto";

export class CreateOrderDto extends CreateBaseReqDto {
  @StringFieldOptional({ maxLength: 50 })
  orderNumber?: string;

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

  @StringFieldOptional()
  notes?: string;

  @StringFieldOptional()
  shippingAddress?: string;

  @StringFieldOptional()
  billingAddress?: string;

  @ClassField(() => CreateOrderItemDto, { each: true })
  items: CreateOrderItemDto[];
}
