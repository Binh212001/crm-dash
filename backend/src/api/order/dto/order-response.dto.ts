import { Expose, Type } from 'class-transformer';
import { BaseResDto } from '@/api/base/dto/base.res.dto';
import { OrderStatus, PaymentStatus } from '../entities/order.entity';
import { CustomerResponseDto } from '@/api/customer/dto/customer-response.dto';

/**
 * Mirrors the structure of OrderItemEntity for API responses.
 */


// Dummy DTOs for product and variant, replace with actual imports if available
export class ProductResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;
}



export class ProductVariantResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;
}

export class OrderItemResponseDto extends BaseResDto {
  @Expose()
  id: string;

  @Expose()
  orderId: string;

  @Expose()
  productId?: string;

  @Expose()
  productVariantId?: string;

  @Expose()
  quantity: number;

  @Expose()
  @Type(() => ProductResponseDto)
  product?: ProductResponseDto;

  @Expose()
  @Type(() => ProductVariantResponseDto)
  productVariant?: ProductVariantResponseDto;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}


export class OrderResponseDto extends BaseResDto {
  @Expose()
  id: string;

  @Expose()
  orderNumber: string;

  @Expose()
  status: OrderStatus;

  @Expose()
  paymentStatus: PaymentStatus;

  @Expose()
  subtotal: number;

  @Expose()
  tax: number;

  @Expose()
  shipping: number;

  @Expose()
  total: number;

  @Expose()
  customerId?: string;

  @Expose()
  userId?: string;

  @Expose()
  notes?: string;

  @Expose()
  shippingAddress?: string;

  @Expose()
  billingAddress?: string;

  @Expose()
  trackingNumber?: string;

  @Expose()
  estimatedDelivery?: Date;

  @Expose()
  shippedAt?: Date;

  @Expose()
  deliveredAt?: Date;

  @Expose()
  @Type(() => OrderItemResponseDto)
  items: OrderItemResponseDto[];

  @Expose()
  @Type(() => CustomerResponseDto)
  customer?: CustomerResponseDto;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}