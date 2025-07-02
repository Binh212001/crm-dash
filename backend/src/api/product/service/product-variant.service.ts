import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { paginate } from '@/utils/offset-pagination';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateProductVariantDto } from '../dto/create-product-variant.dto';
import { ProductVariantResponseDto } from '../dto/product-variant-response.dto';
import { UpdateProductVariantDto } from '../dto/update-product-variant.dto';
import { ProductVariantEntity } from '../entities/product-variant.entity';
import { ProductVariantRepository } from '../repository/product-variant.repository';
import { VariantValueRepository } from '../repository/variant-value.repository';

@Injectable()
export class ProductVariantService {
  constructor(
    private readonly productVariantRepository: ProductVariantRepository,
    private readonly variantValueRepository: VariantValueRepository,
  ) {}

  async create(data: CreateProductVariantDto): Promise<ProductVariantResponseDto> {
    const { values, ...variantData } = data;
    const variant = this.productVariantRepository.create(variantData);
    const savedVariant = await this.productVariantRepository.save(variant);
    if (values && values.length > 0) {
      const valueEntities = values.map(value => this.variantValueRepository.create({ name: value, productVariant: savedVariant }));
      await this.variantValueRepository.save(valueEntities);
    }
    const result = await this.productVariantRepository.findOne({ where: { id: savedVariant.id }, relations: ['values'] });
    return plainToInstance(ProductVariantResponseDto, {
      ...result,
      values: result?.values?.map(v => v.name) || [],
    }, { excludeExtraneousValues: true });
  }

  async findAll(reqDto: any): Promise<OffsetPaginatedDto<ProductVariantResponseDto>> {
    const query = this.productVariantRepository.createQueryBuilder('variant').leftJoinAndSelect('variant.values', 'values').orderBy('variant.id', 'DESC');
    const [base, metaDto] = await paginate<ProductVariantEntity>(query, reqDto, {
      skipCount: false,
      takeAll: false,
    });
    const data = base.map(variant => ({
      ...variant,
      values: variant.values?.map(v => v.name) || [],
    }));
    return new OffsetPaginatedDto(plainToInstance(ProductVariantResponseDto, data), metaDto);
  }

  async findOne(id: string): Promise<ProductVariantResponseDto | null> {
    const variant = await this.productVariantRepository.findOne({ where: { id }, relations: ['values'] });
    if (!variant) return null;
    return plainToInstance(ProductVariantResponseDto, {
      ...variant,
      values: variant.values?.map(v => v.name) || [],
    }, { excludeExtraneousValues: true });
  }

  async update(id: string, data: UpdateProductVariantDto): Promise<ProductVariantResponseDto | null> {
    const { values, ...updateData } = data;
    await this.productVariantRepository.update(id, updateData);
    if (values) {
      await this.variantValueRepository.delete({ productVariant:{ id} });
      const valueEntities = values.map(value => this.variantValueRepository.create({ name: value, productVariant: {id} }));
      await this.variantValueRepository.save(valueEntities);
    }
    const updatedVariant = await this.productVariantRepository.findOne({ where: { id }, relations: ['values'] });
    if (!updatedVariant) return null;
    return plainToInstance(ProductVariantResponseDto, {
      ...updatedVariant,
      values: updatedVariant.values?.map(v => v.name) || [],
    }, { excludeExtraneousValues: true });
  }

  async remove(id: string): Promise<void> {
    
    await this.productVariantRepository.delete(id);
  }
} 