import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/api/base/base.repository';
import { PermissionEntity } from '../entities/permission.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class PermissionRepository extends BaseRepository<PermissionEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(PermissionEntity, dataSource.createEntityManager());
  }
}
