import { Expose, Type } from 'class-transformer';

export class ProductVariantResponseDto {
  @Expose()
  id: string;

  @Expose()
  sku: string;

  @Expose()
  price: number;

  @Expose()
  productId?: string;


  @Expose()
  @Type(() => String)
  values?: string[];
} 