import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionEntity } from './entities/permission.entity';
import { RoleEntity } from './entities/role.entity';
import { PermissionRepository } from './repositories/permission.repository';
import { RoleRepository } from './repositories/role.repository';
import { PermissionService } from './permission.service';
import { RoleService } from './role.service';
import { PermissionController } from './permission.controller';
import { RoleController } from './role.controller';

@Module({
  imports: [],
  providers: [
    PermissionRepository,
    RoleRepository,
    PermissionService,
    RoleService,
  ],
  controllers: [PermissionController, RoleController],
  exports: [PermissionService, RoleService, PermissionRepository, RoleRepository],
})
export class PermissionsModule {} 