import { ListBaseReqDto } from "@/api/base/dto/list-base.req.dto";
import { StringField } from "@/decorators/field.decorators";

export class GetRoomMessageReqDto extends ListBaseReqDto {
  @StringField()
  roomId: string;
}
