import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Column, Entity, PrimaryColumn, ManyToMany, ManyToOne, OneToMany, JoinColumn, Relation } from 'typeorm';
import { v7 } from 'uuid';
import { ProductEntity } from './product.entity';
import { VariantAttributeEntity } from './variant-attribute.entity';
import { VariantValueEntity } from './variant-value.entity';

@Entity('product_variants')
export class ProductVariantEntity extends AbstractEntity {
  @PrimaryColumn('uuid')
  id: string = v7();


  @Column('decimal')
  price: number;

  @ManyToOne(() => ProductEntity, product => product.variants)
  product: Relation<ProductEntity>;


  @OneToMany(() => VariantValueEntity, value => value.productVariant, { eager: true })
  values?: Relation<VariantValueEntity[]>;

  @ManyToOne(() => VariantAttributeEntity, { nullable: true, eager: true })
  @JoinColumn({ name: 'attributeId' })
  attribute?: Relation<VariantAttributeEntity>;

  constructor(data?: Partial<ProductVariantEntity>) {
    super();
    Object.assign(this, data);
  }
} 