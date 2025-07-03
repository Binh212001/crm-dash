import { PageOptionsDto } from '@/common/dto/offset-pagination/page-options.dto';
import { StringFieldOptional } from '@/decorators/field.decorators';

export class ListUserDto extends PageOptionsDto {
  @StringFieldOptional()
  username?: string;

  @StringFieldOptional()
  email?: string;

  @StringFieldOptional()
  phone?: string;
}
