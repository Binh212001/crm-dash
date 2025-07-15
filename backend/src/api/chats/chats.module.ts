import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { ChatRepository } from './chat.repository';
import { ChatGateway } from './chats.gateway';
import { ChatsService } from './chats.service';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule,
  ],
  providers: [
    ChatsService,
    ChatRepository,
    
    ChatGateway
  ],
  exports: [
    ChatsService,
    ChatRepository
  ],
})
export class ChatsModule { }
