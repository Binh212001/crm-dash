import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v7 } from 'uuid';

@Entity('customers')
export class CustomerEntity extends AbstractEntity {
  @PrimaryColumn('uuid')
  id: string = v7();

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ nullable: true, length: 30 })
  phone?: string;

  @Column({ nullable: true, length: 100 })
  country?: string;

  @Column({ nullable: true, length: 200 })
  address?: string;

  @Column({ nullable: true, length: 100 })
  city?: string;

  @Column({ nullable: true, length: 20 })
  postalCode?: string;

  @Column({ default: 0 })
  orders: number;

  @Column({ type: 'decimal', default: 0 })
  totalSpent: number;

  @Column({ nullable: true })
  lastSeen?: Date;

  @Column({ nullable: true })
  lastOrder?: Date;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ type: 'simple-array', nullable: true })
  tags?: string[];

  constructor(data?: Partial<CustomerEntity>) {
    super();
    Object.assign(this, data);
  }
} 