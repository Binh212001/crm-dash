import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  StringField,
  StringFieldOptional,
  UUIDFieldOptional,
  ClassFieldOptional,
  NumberFieldOptional,
} from "@/decorators/field.decorators";
import { IsArray } from "class-validator";

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

  @NumberFieldOptional()
  stock?: string;

  @StringFieldOptional()
  price?: string;

  @UUIDFieldOptional({ each: true })
  @IsArray()
  tags?: string[];
}
