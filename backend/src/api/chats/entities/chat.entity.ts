import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Column, Entity, ManyToOne, PrimaryColumn, Relation } from 'typeorm';
import { UserEntity } from '@/api/user/entities/user.entity';
import { RoomEntity } from '@/api/rooms/entities/room.entity';
import { v7 } from 'uuid';

@Entity('chats')
export class ChatEntity extends AbstractEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => UserEntity, { eager: true })
  sender: Relation<UserEntity>;

  @ManyToOne(() => RoomEntity, { eager: true })
  room: Relation<RoomEntity>;

  constructor(data?: Partial<ChatEntity>) {
    super();
    this.id = v7();
    Object.assign(this, data);
  }
}