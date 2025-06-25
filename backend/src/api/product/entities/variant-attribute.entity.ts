import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Column, Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { v7 } from 'uuid';
import { ProductVariantEntity } from './product-variant.entity';
import { VariantValueEntity } from './variant-value.entity';

@Entity('variant_attributes')
export class VariantAttributeEntity extends AbstractEntity {
  @PrimaryColumn('uuid')
  id: string = v7();

  @Column()
  name: string;

  @OneToMany(() => VariantValueEntity, value => value.attribute , {
    eager: true
  })
  values?: VariantValueEntity[];

  constructor(data?: Partial<VariantAttributeEntity>) {
    super();
    Object.assign(this, data);
  }
} 