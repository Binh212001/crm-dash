import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Column, Entity, PrimaryColumn, ManyToMany } from 'typeorm';
import { v7 } from 'uuid';
import { ProductEntity } from '@/api/product/entities/product.entity';

@Entity('tags')
export class TagEntity extends AbstractEntity {
  @PrimaryColumn('uuid')
  id: string = v7();

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToMany(() => ProductEntity, (product) => product.tags)
  products?: ProductEntity[];

  constructor(data?: Partial<TagEntity>) {
    super();
    Object.assign(this, data);
  }
} 