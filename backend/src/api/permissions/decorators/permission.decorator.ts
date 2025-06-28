import { SetMetadata } from '@nestjs/common';

export const HAS_PERMISSION = 'HAS_PERMISSION';
export const HasPermissions = (...permissions: string[]) =>
  SetMetadata(HAS_PERMISSION, permissions);