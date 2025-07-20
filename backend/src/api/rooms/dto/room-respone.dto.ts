import { ApiProperty } from "@nestjs/swagger";
import { UserResponseDto } from "../../user/dto/user-response.dto";
import { RoomType } from "../enums/room-type.enum";
import { Expose, Type } from "class-transformer";

export class RoomResponseDto {
  @Expose()
  id: string;

  @Expose()
  name?: string;

  @Expose()
  description?: string;

  @Expose()
  type: RoomType;

  @Expose()
  @Type(() => UserResponseDto)
  members: UserResponseDto[];
}
