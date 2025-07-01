import { Expose } from 'class-transformer';

export class VariantValueResponseDto {
  @Expose()
  id: string;

  @Expose()
  value: string;
} 