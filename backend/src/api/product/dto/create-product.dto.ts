import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StringField, StringFieldOptional, UUIDFieldOptional, ClassFieldOptional } from '@/decorators/field.decorators';

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

  @StringFieldOptional()
  stock?: string;
  @StringFieldOptional()
  price?: string;

  @UUIDFieldOptional({ each: true })
  tags?: string[];

}
