import { StringFieldOptional } from '@/decorators/field.decorators';

export class UpdateVariantValueDto {
  @StringFieldOptional()
  name?: string;

  @StringFieldOptional()
  attributeId?: string;
} 