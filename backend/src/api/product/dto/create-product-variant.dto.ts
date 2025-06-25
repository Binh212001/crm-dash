import { StringField, NumberField, UUIDFieldOptional } from '@/decorators/field.decorators';

export class CreateProductVariantDto {
  @StringField()
  sku: string;

  @NumberField()
  price: number;

  @UUIDFieldOptional()
  attributeId?: string;

  @UUIDFieldOptional({ each: true })
  values?: string[];
}