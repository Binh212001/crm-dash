import { BaseResDto } from '@/api/base/dto/base.res.dto';
import { OrderStatus, PaymentStatus } from '../entities/order.entity';

export class OrderItemResponseDto extends BaseResDto {
  id: string;
  productName: string;
  variantName?: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  sku?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class OrderResponseDto extends BaseResDto {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  customerId?: string;
  userId?: string;
  notes?: string;
  shippingAddress?: string;
  billingAddress?: string;
  trackingNumber?: string;
  estimatedDelivery?: Date;
  shippedAt?: Date;
  deliveredAt?: Date;
  items: OrderItemResponseDto[];
  createdAt: Date;
  updatedAt: Date;
} 