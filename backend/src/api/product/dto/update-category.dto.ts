import { StringFieldOptional } from '@/decorators/field.decorators';

export class UpdateCategoryDto {
  @StringFieldOptional()
  name?: string;

  @StringFieldOptional()
  description?: string;
}