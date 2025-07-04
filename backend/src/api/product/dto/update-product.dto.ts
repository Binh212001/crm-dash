import { StringFieldOptional, UUIDFieldOptional, ClassFieldOptional } from '@/decorators/field.decorators';

export class UpdateProductDto {
  @StringFieldOptional()
  name?: string;

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
