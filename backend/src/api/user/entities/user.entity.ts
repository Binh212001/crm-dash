
import { FileResDto } from '@/api/base/dto/file-res.dto';
import { AbstractEntity } from '@/database/entities/abstract.entity';
import { hashPassword } from '@/utils/password.util';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToMany, 
  PrimaryColumn,
  Relation
} from 'typeorm';
import { v7 } from 'uuid';
import { RoleEntity } from '../../permissions/entities/role.entity';

@Entity('users')
export class UserEntity extends AbstractEntity {
  @PrimaryColumn('uuid', { primaryKeyConstraintName: 'PK_user_id' })
  id: string;
  @Column({
    length: 50,
    nullable: true,
  })
  @Index('UQ_user_username', {
    where: '"deleted_at" IS NULL',
    unique: true,
  })
  username: string;

  @Column({
    length: 100,
    default: '',
  })
  firstName: string;
  @Column({
    default: '',
    length: 100,
  })
  lastName: string;
  @Column()
  @Index('UQ_user_email', { where: '"deleted_at" IS NULL', unique: true })
  email!: string;

  @Column({ default: '' })
  phoneNumber?: string;
  @Column({ default: '', nullable: true })
  address?: string;

  @Column({ nullable: true })
  dateOfBirth?: Date;

  @Column()
  password!: string;
  @Column({ default: '' })
  bio?: string;
  @Column({ type: 'jsonb', default: { url: '' } })
  image?: FileResDto;
  @Column({ default: 0 })
  numberOfCourse: number;
  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  isSuperUser: boolean;

  @Column({ default: '', nullable: true })
  referCode: string;
  @Column({ default: '', nullable: true })
  provider: string;

  @Column({ default: '', nullable: true })
  socialId: string;
  @Column({ default: false })
  isInternal: boolean;
  @OneToMany(() => RoleEntity, (role) => role.users ,{
    eager: true
})
@JoinColumn()
  role:Relation< RoleEntity>


  @DeleteDateColumn({
    type: 'timestamptz',
    default: null,
  })
  deletedAt: Date;

  constructor(data?: Partial<UserEntity>) {
    super();
    this.id = v7();
    Object.assign(this, data);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password && !this.isPasswordHashed()) {
      this.password = await hashPassword(this.password);
    }
  }

  private isPasswordHashed(): boolean {
    return this.password.startsWith('$argon2');
  }
}
