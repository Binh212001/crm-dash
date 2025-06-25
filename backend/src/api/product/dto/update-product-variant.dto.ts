import { StringFieldOptional, NumberFieldOptional } from '@/decorators/field.decorators';

export class UpdateProductVariantDto {
  @StringFieldOptional()
  sku?: string;

  @NumberFieldOptional()
  price?: number;

  @StringFieldOptional()
  productId?: string;

  @StringFieldOptional()
  attributeId?: string;

  @StringFieldOptional({ each: true })
  values?: string[];
} 