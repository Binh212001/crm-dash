import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { GetChatDto } from './dto/get-chat.dto';
import { ChatRepository } from './chat.repository';
import { ListBaseReqDto } from '../base/dto/list-base.req.dto';
import { paginate } from '@/utils/offset-pagination';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { plainToInstance } from 'class-transformer';

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

  async findAll(roomId: string, dto: ListBaseReqDto) {
    const query = this.chatRepository
      .createQueryBuilder('chat')
      .leftJoinAndSelect('chat.sender', 'sender')
      .where('chat.room = :roomId', { roomId })
      .orderBy('chat.createdAt', 'ASC');

    const [base, metaDto] = await paginate(query, dto, {
      skipCount: false,
      takeAll: false,
    });

    return new OffsetPaginatedDto(
      plainToInstance(GetChatDto, base, {
        excludeExtraneousValues: true,
      }),
      metaDto
    );
  }
  
}
