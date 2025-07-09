import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { GetChatDto } from './dto/get-chat.dto';
import { ChatRepository } from './chat.repository';

@Injectable()
export class ChatsService {

  constructor(
    private readonly chatRepository: ChatRepository,
  ) { }

  async create(senderId: string, createChatDto: CreateChatDto) {
    // ChatEntity expects sender: UserEntity and room: RoomEntity relations
    const chat = this.chatRepository.create({
      sender: { id: senderId },
      room: { id: createChatDto.roomId },
      content: createChatDto.content,
    });
    return this.chatRepository.save(chat);
  }

  async findAll(roomId: string, getChatDto: GetChatDto) {
    const query: any = {
      roomId,
    };

    if (getChatDto.last_id) {
      query.id = { $lt: getChatDto.last_id };
    }

    // Assuming the repository supports find with options
    return this.chatRepository.find({
      where: query,
      order: { createdAt: 'DESC' },
      take: getChatDto.limit,
    });
  }
}
