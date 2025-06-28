import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { PageOptionsDto } from '@/common/dto/offset-pagination/page-options.dto';
import { OrderStatus, PaymentStatus } from '../entities/order.entity';

export class ListOrderDto extends PageOptionsDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @IsOptional()
  @IsEnum(PaymentStatus)
  paymentStatus?: PaymentStatus;

  @IsOptional()
  @IsUUID()
  customerId?: string;

  @IsOptional()
  @IsUUID()
  userId?: string;
} 