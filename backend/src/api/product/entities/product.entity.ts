import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Column, Entity, PrimaryColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { v7 } from 'uuid';
import { CategoryEntity } from './category.entity';
import { ProductVariantEntity } from './product-variant.entity';
import { TagEntity } from '@/api/tag/entities/tag.entity';

@Entity('products')
export class ProductEntity extends AbstractEntity {
  @PrimaryColumn('uuid')
  id: string = v7();

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  categoryId?: string;

  @ManyToOne(() => CategoryEntity, { nullable: true })
  @JoinColumn({ name: 'categoryId' })
  category?: CategoryEntity;

  @Column({ nullable: true })
  vendor?: string;

  @Column({ nullable: true })
  collection?: string;

  @ManyToMany((tag)=>tag.products, { eager: true })
  @JoinTable({
    name: 'product_tags',
    joinColumn: { name: 'productId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tagId', referencedColumnName: 'id' },
  })
  tags?: TagEntity[];

  @OneToMany(() => ProductVariantEntity, variant => variant.product, { eager: true })
  variants: ProductVariantEntity[];

  constructor(data?: Partial<ProductEntity>) {
    super();
    Object.assign(this, data);
  }
} 