import { StringFieldOptional } from '@/decorators/field.decorators';

export class UpdateVariantAttributeDto {
  @StringFieldOptional()
  name?: string;
} 