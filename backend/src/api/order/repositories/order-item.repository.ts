import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/api/base/base.repository';
import { OrderItemEntity } from '../entities/order-item.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class OrderItemRepository extends BaseRepository<OrderItemEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(OrderItemEntity, dataSource.createEntityManager());
  }
} 