import { PageOptionsDto } from '@/common/dto/offset-pagination/page-options.dto';
import { StringFieldOptional } from '@/decorators/field.decorators';

export class ListCustomerDto extends PageOptionsDto {
  @StringFieldOptional()
  name?: string;

  @StringFieldOptional()
  email?: string;
  
  @StringFieldOptional()
  phone?: string;

  @StringFieldOptional()
  city?: string;
} 