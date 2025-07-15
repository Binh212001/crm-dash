import { Expose, Type } from 'class-transformer';
import { ChatEntity } from '../entities/chat.entity';
import { UserResponseDto } from '@/api/user/dto/user-response.dto';

export class GetChatDto {
  @Expose()
  id: string;

  @Expose()
  content: string;

  @Expose()
  @Type(() => UserResponseDto)
  sender: UserResponseDto;

  @Expose()
  createdAt: Date;
}
