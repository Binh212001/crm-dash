import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Column, Entity, PrimaryColumn, ManyToMany, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { v7 } from 'uuid';
import { ProductEntity } from './product.entity';
import { VariantAttributeEntity } from './variant-attribute.entity';
import { VariantValueEntity } from './variant-value.entity';

@Entity('product_variants')
export class ProductVariantEntity extends AbstractEntity {
  @PrimaryColumn('uuid')
  id: string = v7();

  @Column()
  sku: string;

  @Column('decimal')
  price: number;

  @ManyToOne(() => ProductEntity, product => product.variants)
  product: ProductEntity;

  @Column({ nullable: true })
  attributeId?: string;

  @OneToMany(() => VariantValueEntity, value => value.productVariant, { eager: true })
  values?: VariantValueEntity[];

  @ManyToOne(() => VariantAttributeEntity, { nullable: true, eager: true })
  @JoinColumn({ name: 'attributeId' })
  attribute?: VariantAttributeEntity;

  constructor(data?: Partial<ProductVariantEntity>) {
    super();
    Object.assign(this, data);
  }
} 