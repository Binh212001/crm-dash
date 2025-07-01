import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StringField, StringFieldOptional, UUIDFieldOptional, ClassFieldOptional } from '@/decorators/field.decorators';
import { CreateProductVariantDto } from './create-product-variant.dto';

export class CreateProductDto {
  @StringField()
  name: string;

  @StringField()
  sku: string;

  @StringFieldOptional()
  description?: string;

  @UUIDFieldOptional()
  categoryId?: string;

  @StringFieldOptional()
  vendor?: string;

  @StringFieldOptional()
  collection?: string;

  @UUIDFieldOptional({ each: true })
  tags?: string[];

  @ClassFieldOptional(() => CreateProductVariantDto, { each: true })
  
  productVariant?: CreateProductVariantDto[];
}
