import {
  UUIDField,
  UUIDFieldOptional,
  NumberField,
} from '@/decorators/field.decorators';
import { CreateBaseReqDto } from '@/api/base/dto/create-base.req.dto';

export class CreateOrderItemDto extends CreateBaseReqDto {
  @UUIDField()
  orderId: string;

  @UUIDField()
  productVariantId?: string;

  @UUIDField()
  productId?: string;

  @NumberField({ min: 1, int: true })
  quantity: number;
}