import { Expose } from 'class-transformer';

export class VariantAttributeResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;
} 