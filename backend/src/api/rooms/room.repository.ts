import { BaseRepository } from '@/api/base/base.repository';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { RoomEntity } from './entities/room.entity';

@Injectable()
export class RoomRepository extends BaseRepository<RoomEntity> {
  constructor(
    private readonly dataSource: DataSource,
  ) {
    super(RoomEntity, dataSource.createEntityManager());
  }
}
