import { Expose, Type } from 'class-transformer';
import { VariantValueResponseDto } from './variant-value-response.dto';

export class VariantAttributeResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  @Type(() => VariantValueResponseDto)
  values: VariantValueResponseDto[];
} 