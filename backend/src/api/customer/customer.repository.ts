import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/api/base/base.repository';
import { CustomerEntity } from './entities/customer.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class CustomerRepository extends BaseRepository<CustomerEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CustomerEntity, dataSource.createEntityManager());
  }
} 