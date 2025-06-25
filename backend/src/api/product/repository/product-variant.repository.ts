import { BaseRepository } from '@/api/base/base.repository';
import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ProductVariantEntity } from '../entities/product-variant.entity';

@Injectable()
export class ProductVariantRepository extends BaseRepository<ProductVariantEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ProductVariantEntity, dataSource.createEntityManager());
  }
} 