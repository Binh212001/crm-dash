import { BaseResDto } from '@/api/base/dto/base.res.dto';
import {
  NumberField,
  StringField,
  StringFieldOptional,
  UUIDField,
} from '@/decorators/field.decorators';
import { FileType } from '../type/file.type';

export class FileResDto extends BaseResDto {
  @UUIDField()
  id: string;

  @StringField()
  title: string;

  @StringField()
  type: FileType;

  @NumberField()
  size: number;

  @StringField()
  url: string;

  @StringFieldOptional()
  thumbnailUrl?: string;

  @StringFieldOptional()
  createdAt?: Date;
}
