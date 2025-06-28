import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength, Min } from 'class-validator';
import { CreateBaseReqDto } from '@/api/base/dto/create-base.req.dto';

export class CreateOrderItemDto extends CreateBaseReqDto {
  @IsOptional()
  @IsUUID()
  productVariantId?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  productName: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  variantName?: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  unitPrice: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;

  @IsOptional()
  @IsString()
  sku?: string;
} 