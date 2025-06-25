import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v7 } from 'uuid';

@Entity('categories')
export class CategoryEntity extends AbstractEntity {
  @PrimaryColumn('uuid')
  id: string = v7();

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  constructor(data?: Partial<CategoryEntity>) {
    super();
    Object.assign(this, data);
  }
} 