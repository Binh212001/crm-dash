import { BaseResDto } from '@/api/base/dto/base.res.dto';

export class PermissionResponseDto extends BaseResDto {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
} 