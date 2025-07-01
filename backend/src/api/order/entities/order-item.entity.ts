import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { v7 } from 'uuid';
import { OrderEntity } from './order.entity';
import { ProductVariantEntity } from '@/api/product/entities/product-variant.entity';

@Entity('order_items')
export class OrderItemEntity extends AbstractEntity {
  @PrimaryColumn('uuid')
  id: string = v7();

  @Column()
  orderId: string;

  @ManyToOne(() => OrderEntity, order => order.items)
  @JoinColumn({ name: 'orderId' })
  order: OrderEntity;

  @ManyToOne(() => ProductVariantEntity, { nullable: true })
  @JoinColumn({ name: 'productVariantId' })
  productVariant?: ProductVariantEntity;

  @Column({ length: 200 })
  productName: string;

  @Column({ length: 100, nullable: true })
  variantName?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unitPrice: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @Column({ nullable: true })
  sku?: string;

  constructor(data?: Partial<OrderItemEntity>) {
    super();
    Object.assign(this, data);
  }
} 