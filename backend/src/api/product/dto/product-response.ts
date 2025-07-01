import { TagResponseDto } from '@/api/tag/dto/tag-response.dto';
import { Expose, Type } from 'class-transformer';
import { VariantAttributeResponseDto } from './variant-attribute-response.dto';

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
  @Expose()
  @Type(() => VariantAttributeResponseDto)
  attribute?: VariantAttributeResponseDto[];
}

export class ProductResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;
  @Expose()
  sku: string;

  @Expose()
  description?: string;

  @Expose()
  categoryId?: string;

  @Expose()
  vendor?: string;

  @Expose()
  collection?: string;

  @Expose()
  @Type(() => TagResponseDto)
  tags?: TagResponseDto

  @Expose()
  @Type(() => ProductVariantAttributeResponseDto)
  variants?: ProductVariantAttributeResponseDto[];
}