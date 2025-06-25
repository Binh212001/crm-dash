import { BaseRepository } from '@/api/base/base.repository';
import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { VariantAttributeEntity } from '../entities/variant-attribute.entity';

@Injectable()
export class VariantAttributeRepository extends BaseRepository<VariantAttributeEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(VariantAttributeEntity, dataSource.createEntityManager());
  }
} 