import { BaseRepository } from '@/api/base/base.repository';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';

@Injectable()
export class ProductRepository extends BaseRepository<ProductEntity> {
  constructor(
    private readonly dataSource: DataSource,
  ) {
    super(ProductEntity, dataSource.createEntityManager());
  }
}