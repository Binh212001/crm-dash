import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { ChatsService } from '../chats/chats.service';
import { GetChatDto } from '../chats/dto/get-chat.dto';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomsService } from './rooms.service';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserResponseDto } from '../user/dto/user-response.dto';

@Controller('rooms')
export class RoomsController {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly chatsService: ChatsService,
  ) {}

  @Post()
  create(
    @Body() createRoomDto: CreateRoomDto,
    @CurrentUser() user: UserResponseDto
  ) {
    return this.roomsService.create(user.id, createRoomDto);
  }

  @Get()
  getByRequest(
    @CurrentUser() user: UserResponseDto
  ) {
    return this.roomsService.getByRequest(user.id);
  }

  @Get(':id/chats')
  @ApiParam({ name: 'id', required: true })
  getChats(
    @Param('id') id: string,
    @Query() dto: GetChatDto
  ) {
    return this.chatsService.findAll(id, new GetChatDto(dto));
  }
}
