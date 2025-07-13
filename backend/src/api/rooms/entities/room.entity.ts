import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Column, Entity, ManyToMany, JoinTable, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
import { RoomType } from '../enums/room-type.enum';
import { UserEntity } from '@/api/user/entities/user.entity';
import { v7 } from 'uuid';

@Entity('rooms')
export class RoomEntity extends AbstractEntity {

  @PrimaryColumn('uuid')
  id: string;

  @Column({ length: 255, nullable: true })
  name: string;

  @Column({
    type: 'enum',
    enum: RoomType,
    default: RoomType.PERSONAL,
  })
  type: RoomType;

  @ManyToMany(() => UserEntity, { eager: true })
  @JoinTable({
    name: 'room_members',
    joinColumn: { name: 'room_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  members: UserEntity[];

  constructor(data?: Partial<RoomEntity>) {
    super();
    this.id = v7();
    Object.assign(this, data);
  }
}
