import { Expose, Type } from "class-transformer";
import { UserResponseDto } from "@/api/user/dto/user-response.dto";

export class GetRoomMessageResDto {
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
