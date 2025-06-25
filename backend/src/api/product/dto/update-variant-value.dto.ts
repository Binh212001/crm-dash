import { StringFieldOptional } from '@/decorators/field.decorators';

export class UpdateVariantValueDto {
  @StringFieldOptional()
  value?: string;

  @StringFieldOptional()
  attributeId?: string;
} 