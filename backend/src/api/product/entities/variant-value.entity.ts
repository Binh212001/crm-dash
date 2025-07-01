import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn, Relation } from 'typeorm';
import { v7 } from 'uuid';
import { ProductVariantEntity } from './product-variant.entity';
import { VariantAttributeEntity } from './variant-attribute.entity';

@Entity('variant_values')
export class VariantValueEntity extends AbstractEntity {
  @PrimaryColumn('uuid')
  id: string = v7();

  @Column()
  value: string;



  @ManyToOne(() => ProductVariantEntity, variant => variant.values, { nullable: true })
  @JoinColumn({ name: 'productVariantId' })
  productVariant?: Relation<ProductVariantEntity>;

  @ManyToOne(() => VariantAttributeEntity, attribute => attribute.values, { nullable: true })
  @JoinColumn({ name: 'attributeId' })
  attribute?: Relation<VariantAttributeEntity>;

  constructor(data?: Partial<VariantValueEntity>) {
    super();
    Object.assign(this, data);
  }
} 