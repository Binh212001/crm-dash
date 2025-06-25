import { BaseRepository } from '@/api/base/base.repository';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TagEntity } from './entities/tag.entity';

@Injectable()
export class TagRepository extends BaseRepository<TagEntity> {
  constructor(
    private readonly dataSource: DataSource,
  ) {
    super(TagEntity, dataSource.createEntityManager());
  }
}