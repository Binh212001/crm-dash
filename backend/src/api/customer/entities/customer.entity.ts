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

  @Column({ default: 0 })
  orders: number;

  @Column({ type: 'decimal', default: 0 })
  totalSpent: number;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  lastSeen?: Date;

  @Column({ nullable: true })
  lastOrder?: Date;

  @Column({ nullable: true })
  avatar?: string;

  constructor(data?: Partial<CustomerEntity>) {
    super();
    Object.assign(this, data);
  }
} 