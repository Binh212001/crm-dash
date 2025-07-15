import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { RoomRepository } from './room.repository';
import { ChatsModule } from '../chats/chats.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    ChatsModule ,
    UserModule
  ],
  controllers: [RoomsController],
  providers: [RoomsService, RoomRepository],
  exports: [RoomsService, RoomRepository],
})
export class RoomsModule { }
