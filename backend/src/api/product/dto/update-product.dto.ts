import { StringFieldOptional, UUIDFieldOptional, ClassFieldOptional } from '@/decorators/field.decorators';
import { CreateProductVariantDto } from './create-product-variant.dto';

export class UpdateProductDto {
  @StringFieldOptional()
  name?: string;

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
