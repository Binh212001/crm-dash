import { PageOptionsDto } from '@/common/dto/offset-pagination/page-options.dto';
import { OrderStatus } from '../entities/order.entity';
import { StringFieldOptional, EnumFieldOptional, DateFieldOptional } from '@/decorators/field.decorators';

export class ListOrderDto extends PageOptionsDto {
  @StringFieldOptional()
  search?: string;

  @EnumFieldOptional(() => OrderStatus)
  status?: OrderStatus;

  @DateFieldOptional()
  createdAt?: Date;
}