import { StringField, StringFieldOptional } from '@/decorators/field.decorators';

export class CreateVariantAttributeDto {
  @StringField()
  name: string;

  @StringFieldOptional({ each: true })
  values?: string[];
}