import { Injectable } from '@nestjs/common';
import { TagRepository } from './tag.repository';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagResponseDto } from './dto/tag-response.dto';
import { plainToInstance } from 'class-transformer';
import { TagEntity } from './entities/tag.entity';
import { ListTagDto } from './dto/list-tag.dto';
import { paginate } from '@/utils/offset-pagination';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  async create(data: CreateTagDto): Promise<TagResponseDto> {
    const tag = this.tagRepository.create(data);
    const savedTag = await this.tagRepository.save(tag);
    return plainToInstance(TagResponseDto, savedTag, { excludeExtraneousValues: true });
  }

  async findAll(reqDto: ListTagDto): Promise<OffsetPaginatedDto<TagResponseDto>> {
    const query = this.tagRepository.createQueryBuilder('tag').orderBy('tag.id', 'DESC');
    const [base, metaDto] = await paginate<TagEntity>(query, reqDto, {
      skipCount: false,
      takeAll: false,
    });
    return new OffsetPaginatedDto(plainToInstance(TagResponseDto, base), metaDto);
  }

  async findOne(id: string): Promise<TagResponseDto | null> {
    const tag = await this.tagRepository.findOne({ where: { id } });
    if (!tag) return null;
    return plainToInstance(TagResponseDto, tag, { excludeExtraneousValues: true });
  }

  async update(id: string, data: UpdateTagDto): Promise<TagResponseDto | null> {
    await this.tagRepository.update(id, data);
    const updatedTag = await this.tagRepository.findOne({ where: { id } });
    if (!updatedTag) return null;
    return plainToInstance(TagResponseDto, updatedTag, { excludeExtraneousValues: true });
  }

  async remove(id: string): Promise<void> {
    await this.tagRepository.delete(id);
  }
} 