import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateBaseReqDto } from '@/api/base/dto/create-base.req.dto';
import { CreateOrderItemDto } from './create-order-item.dto';
import { OrderStatus, PaymentStatus } from '../entities/order.entity';

export class CreateOrderDto extends CreateBaseReqDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  orderNumber?: string;

  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @IsOptional()
  @IsEnum(PaymentStatus)
  paymentStatus?: PaymentStatus;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  subtotal: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  tax?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  shipping?: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  total: number;

  @IsOptional()
  @IsUUID()
  customerId?: string;

  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  shippingAddress?: string;

  @IsOptional()
  @IsString()
  billingAddress?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
} 