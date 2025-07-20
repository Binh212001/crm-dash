import { Injectable } from "@nestjs/common";
import { UserRepository } from "../user/user.repository";
import { CreateRoomDto } from "./dto/create-room.dto";
import { RoomEntity } from "./entities/room.entity";
import { RoomRepository } from "./room.repository";
import { RoomResponseDto } from "./dto/room-respone.dto";
import { plainToInstance } from "class-transformer";
import { GetRoomMessageReqDto } from "./dto/get-room-message.req";
import { ChatRepository } from "../chats/chat.repository";
import { ChatEntity } from "../chats/entities/chat.entity";
import { paginate } from "@/utils/offset-pagination";
import { OffsetPaginatedDto } from "@/common/dto/offset-pagination/paginated.dto";
import { GetRoomMessageResDto } from "./dto/get-room-message.res";

@Injectable()
export class RoomsService {
  constructor(
    private readonly roomRepository: RoomRepository,
    private readonly userRepository: UserRepository,
    private readonly chatRepository: ChatRepository
  ) {}

  async create(
    userId: string,
    createRoomDto: CreateRoomDto
  ): Promise<RoomEntity> {
    const creator = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!creator) {
      throw new Error("User not found");
    }

    // If memberId is provided, fetch the member and add to the room
    let members = [creator];
    if (createRoomDto.memberId && createRoomDto.memberId !== userId) {
      const member = await this.userRepository.findOne({
        where: { id: createRoomDto.memberId },
      });
      if (!member) {
        throw new Error("Member not found");
      }
      members.push(member);
    }

    const room = this.roomRepository.create({
      ...createRoomDto,
      members,
    });

    return await this.roomRepository.save(room);
  }

  async getUserRooms(userId: string): Promise<RoomResponseDto[]> {
    const res = await this.roomRepository.find({
      where: {
        members: {
          id: userId,
        },
      },
      relations: ["members"],
    });
    return plainToInstance(RoomResponseDto, res);
  }

  async getRoomMessages(userId: string, dto: GetRoomMessageReqDto) {
    const { roomId } = dto;

    // Ensure the user is a member of the room before fetching messages
    const isMember = await this.roomRepository
      .createQueryBuilder("room")
      .leftJoin("room.members", "member")
      .where("room.id = :roomId", { roomId })
      .andWhere("member.id = :userId", { userId })
      .getExists();

    if (!isMember) {
      throw new Error("You are not a member of this room");
    }

    // Fetch messages for the room, newest first
    const query = this.chatRepository
      .createQueryBuilder("chat")
      .leftJoinAndSelect("chat.sender", "sender")
      .where("chat.room = :roomId", { roomId })
      .orderBy("chat.createdAt", "ASC");

    const [base, metaDto] = await paginate<ChatEntity>(query, dto, {
      skipCount: false,
      takeAll: false,
    });

    return new OffsetPaginatedDto(
      plainToInstance(GetRoomMessageResDto, base),
      metaDto
    );
  }
}
