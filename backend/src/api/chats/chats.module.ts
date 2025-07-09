import { Module } from '@nestjs/common';
import { ChatsGateway } from './chats.gateway';
import { ChatsService } from './chats.service';
import { ChatRepository } from './chat.repository';

@Module({
  imports: [
  ],
  providers: [
    ChatsGateway,
    ChatsService,
    ChatRepository
  ],
  exports: [
    ChatsService,
    ChatRepository
  ],
})
export class ChatsModule { }
