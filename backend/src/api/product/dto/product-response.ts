import { Expose, Type } from 'class-transformer';

export class ProductVariantValueResponseDto {
  @Expose()
  id: string;

  @Expose()
  value: string;
}

export class ProductVariantAttributeResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  @Type(() => ProductVariantValueResponseDto)
  values?: ProductVariantValueResponseDto[];
}

export class ProductResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description?: string;

  @Expose()
  categoryId?: string;

  @Expose()
  vendor?: string;

  @Expose()
  collection?: string;

  @Expose()
  tags?: string[];

  @Expose()
  @Type(() => ProductVariantAttributeResponseDto)
  productVariant?: ProductVariantAttributeResponseDto[];
}