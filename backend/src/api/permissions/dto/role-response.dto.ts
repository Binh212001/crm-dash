import { BaseResDto } from '@/api/base/dto/base.res.dto';
import { PermissionResponseDto } from './permission-response.dto';

export class RoleResponseDto extends BaseResDto {
  id: string;
  name: string;
  description?: string;
  isDefault: boolean;
  permissions?: PermissionResponseDto[];
  createdAt: Date;
  updatedAt: Date;
} 