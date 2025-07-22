import { TagResponseDto } from "@/api/tag/dto/tag-response.dto";
import { Expose, Type } from "class-transformer";

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
  stock?: string;
  @Expose()
  price?: string;
  @Expose()
  sold?: number;

  @Expose()
  image?: string;

  @Expose()
  @Type(() => TagResponseDto)
  tags?: TagResponseDto;
}
