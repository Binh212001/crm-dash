import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { v7 } from 'uuid';
import { OrderEntity } from './order.entity';
import { ProductVariantEntity } from '@/api/product/entities/product-variant.entity';
import { ProductEntity } from '@/api/product/entities/product.entity';

@Entity('order_items')
export class OrderItemEntity extends AbstractEntity {
  @PrimaryColumn('uuid')
  id: string = v7();

  @Column()
  orderId: string;

  @ManyToOne(() => OrderEntity, order => order.items)
  @JoinColumn({ name: 'orderId' })
  order: OrderEntity;

  @ManyToOne(() => ProductVariantEntity, { eager: true })
  @JoinColumn({ name: 'productVariantId' })
  productVariant?: ProductVariantEntity;

  @ManyToOne(() => ProductEntity, { eager: true })
  @JoinColumn()
  product?: ProductEntity;

  @Column({ type: 'int' })
  quantity: number;

  constructor(data?: Partial<OrderItemEntity>) {
    super();
    Object.assign(this, data);
  }
} 