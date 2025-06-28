import { AbstractEntity } from '@/database/entities/abstract.entity';
import {
  Column,
  Entity,
  Index,
  PrimaryColumn,
  ManyToMany,
  JoinTable,
  DeleteDateColumn,
} from 'typeorm';
import { v7 } from 'uuid';
import { RoleEntity } from './role.entity';

@Entity('permissions')
export class PermissionEntity extends AbstractEntity {
  @PrimaryColumn('uuid', { primaryKeyConstraintName: 'PK_permission_id' })
  id: string;

  @Column({
    length: 50,
    nullable: false,
  })
  @Index('UQ_permission_name', {
    where: '"deleted_at" IS NULL',
    unique: true,
  })
  name: string;

  @Column({
    length: 200,
    nullable: true,
  })
  description: string;

  @ManyToMany(() => RoleEntity, (role) => role.permissions)
  
  roles: RoleEntity[];

  @DeleteDateColumn()
  deletedAt: Date

  constructor(data?: Partial<PermissionEntity>) {
    super();
    this.id = v7();
    Object.assign(this, data);
  }
}
