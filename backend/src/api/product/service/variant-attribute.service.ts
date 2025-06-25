import { Injectable } from '@nestjs/common';
import { VariantAttributeRepository } from '../repository/variant-attribute.repository';
import { VariantValueRepository } from '../repository/variant-value.repository';
import { CreateVariantAttributeDto } from '../dto/create-variant-attribute.dto';
import { UpdateVariantAttributeDto } from '../dto/update-variant-attribute.dto';
import { VariantAttributeResponseDto } from '../dto/variant-attribute-response.dto';
import { plainToInstance } from 'class-transformer';
import { VariantAttributeEntity } from '../entities/variant-attribute.entity';
import { paginate } from '@/utils/offset-pagination';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { VariantValueEntity } from '../entities/variant-value.entity';

@Injectable()
export class VariantAttributeService {
  constructor(
    private readonly variantAttributeRepository: VariantAttributeRepository,
    private readonly variantValueRepository: VariantValueRepository,
  ) {}

  async create(data: CreateVariantAttributeDto): Promise<VariantAttributeResponseDto> {
    const { values, ...attrData } = data;
    const attr = this.variantAttributeRepository.create(attrData);
    const savedAttr = await this.variantAttributeRepository.save(attr);
    if (values && values.length > 0) {
      const valueEntities = values.map(value => this.variantValueRepository.create({ value, attributeId: savedAttr.id }));
      await this.variantValueRepository.save(valueEntities);
    }
    return plainToInstance(VariantAttributeResponseDto, savedAttr, { excludeExtraneousValues: true });
  }

  async findAll(reqDto: any): Promise<OffsetPaginatedDto<VariantAttributeResponseDto>> {
    const query = this.variantAttributeRepository.createQueryBuilder('attr').leftJoinAndSelect('attr.values', 'values').orderBy('attr.id', 'DESC');
    const [base, metaDto] = await paginate<VariantAttributeEntity>(query, reqDto, {
      skipCount: false,
      takeAll: false,
    });
    return new OffsetPaginatedDto(plainToInstance(VariantAttributeResponseDto, base), metaDto);
  }

  async findOne(id: string): Promise<VariantAttributeResponseDto | null> {
    const attr = await this.variantAttributeRepository.findOne({ where: { id }, relations: ['values'] });
    if (!attr) return null;
    return plainToInstance(VariantAttributeResponseDto, attr, { excludeExtraneousValues: true });
  }

  async update(id: string, data: UpdateVariantAttributeDto): Promise<VariantAttributeResponseDto | null> {
    await this.variantAttributeRepository.update(id, data);
    const updatedAttr = await this.variantAttributeRepository.findOne({ where: { id }, relations: ['values'] });
    if (!updatedAttr) return null;
    return plainToInstance(VariantAttributeResponseDto, updatedAttr, { excludeExtraneousValues: true });
  }

  async remove(id: string): Promise<void> {
    await this.variantAttributeRepository.delete(id);
  }
} 