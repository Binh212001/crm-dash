import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from './entities/tag.entity';
import { TagRepository } from './tag.repository';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';

@Module({
  providers: [TagRepository, TagService],
  controllers: [TagController],
  exports: [TagService, TagRepository],
})
export class TagModule {} 