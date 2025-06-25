import { BaseRepository } from '@/api/base/base.repository';
import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { VariantValueEntity } from '../entities/variant-value.entity';

@Injectable()
export class VariantValueRepository extends BaseRepository<VariantValueEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(VariantValueEntity, dataSource.createEntityManager());
  }
} 