import { CreateBaseReqDto } from "@/api/base/dto/create-base.req.dto";
import { NumberField, UUIDField } from "@/decorators/field.decorators";

export class CreateOrderItemDto extends CreateBaseReqDto {
  @UUIDField()
  productId?: string;

  @NumberField({ min: 1, int: true })
  quantity: number;
}
