import { CurrentUser } from "@/decorators/current-user.decorator";
import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ApiParam } from "@nestjs/swagger";
import { ListBaseReqDto } from "../base/dto/list-base.req.dto";
import { ChatsService } from "../chats/chats.service";
import { UserResponseDto } from "../user/dto/user-response.dto";
import { CreateRoomDto } from "./dto/create-room.dto";
import { RoomsService } from "./rooms.service";
import { GetRoomMessageReqDto } from "./dto/get-room-message.req";

@Controller("rooms")
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(
    @Body() createRoomDto: CreateRoomDto,
    @CurrentUser() user: UserResponseDto
  ) {
    return this.roomsService.create(user.id, createRoomDto);
  }

  @Get()
  getUserRooms(@CurrentUser() user: UserResponseDto) {
    return this.roomsService.getUserRooms(user.id);
  }

  @Get("/message")
  getRoomMessages(
    @CurrentUser() user: UserResponseDto,
    @Query() dto: GetRoomMessageReqDto
  ) {
    return this.roomsService.getRoomMessages(user.id, dto);
  }
}
