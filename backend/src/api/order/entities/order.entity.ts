import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Column, Entity, PrimaryColumn, ManyToOne, OneToMany, JoinColumn, Index } from 'typeorm';
import { v7 } from 'uuid';
import { CustomerEntity } from '@/api/customer/entities/customer.entity';
import { UserEntity } from '@/api/user/entities/user.entity';
import { OrderItemEntity } from './order-item.entity';

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
  PARTIALLY_REFUNDED = 'partially_refunded',
}

@Entity('orders')
export class OrderEntity extends AbstractEntity {
  @PrimaryColumn('uuid')
  id: string = v7();

  @Column({ length: 50, unique: true })
  @Index('UQ_order_number')
  orderNumber: string;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  paymentStatus: PaymentStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  tax: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  shipping: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({ nullable: true })
  customerId?: string;

  @ManyToOne(() => CustomerEntity, { nullable: true })
  @JoinColumn({ name: 'customerId' })
  customer?: CustomerEntity;

  @Column({ nullable: true })
  userId?: string;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user?: UserEntity;

  @Column({ nullable: true })
  notes?: string;

  @Column({ nullable: true })
  shippingAddress?: string;

  @Column({ nullable: true })
  billingAddress?: string;

  @Column({ nullable: true })
  trackingNumber?: string;

  @Column({ nullable: true })
  estimatedDelivery?: Date;

  @Column({ nullable: true })
  shippedAt?: Date;

  @Column({ nullable: true })
  deliveredAt?: Date;

  @OneToMany(() => OrderItemEntity, item => item.order, { cascade: true })
  items: OrderItemEntity[];

  constructor(data?: Partial<OrderEntity>) {
    super();
    Object.assign(this, data);
  }
} 