import { AbstractEntity } from '@/database/entities/abstract.entity';
import {
  Column,
  Entity,
  Index,
  PrimaryColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import { v7 } from 'uuid';
import { UserEntity } from '../../user/entities/user.entity';
import { PermissionEntity } from './permission.entity';

@Entity('roles')
export class RoleEntity extends AbstractEntity {
  @PrimaryColumn('uuid', { primaryKeyConstraintName: 'PK_role_id' })
  id: string;

  @Column({
    length: 50,
    nullable: false,
  })
  @Index('UQ_role_name', {
    where: '"deleted_at" IS NULL',
    unique: true,
  })
  name: string;

  @Column({
    length: 200,
    nullable: true,
  })
  description: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  isDefault: boolean;

  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[];

  @ManyToMany(() => PermissionEntity, (permission) => permission.roles)
  @JoinTable({
    name: 'role_permissions',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permissions: PermissionEntity[];

  @DeleteDateColumn()
  deletedAt: Date


  constructor(data?: Partial<RoleEntity>) {
    super();
    this.id = v7();
    Object.assign(this, data);
  }
}
