import { BaseRepository } from '@/api/base/base.repository';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ChatEntity } from './entities/chat.entity';

@Injectable()
export class ChatRepository extends BaseRepository<ChatEntity> {
  constructor(
    private readonly dataSource: DataSource,
  ) {
    super(ChatEntity, dataSource.createEntityManager());
  }
}
