import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/api/base/base.repository';
import { OrderEntity } from '../entities/order.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class OrderRepository extends BaseRepository<OrderEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(OrderEntity, dataSource.createEntityManager());
  }
} 