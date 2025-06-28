import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/api/base/base.repository';
import { RoleEntity } from '../entities/role.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class RoleRepository extends BaseRepository<RoleEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(RoleEntity, dataSource.createEntityManager());
  }
}
