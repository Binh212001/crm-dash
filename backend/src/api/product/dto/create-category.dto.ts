import { StringField, StringFieldOptional } from '@/decorators/field.decorators';

export class CreateCategoryDto {
  @StringField()
  name: string;

  @StringFieldOptional()
  description?: string;
}