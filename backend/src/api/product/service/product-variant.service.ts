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
    const { values, attributeId, ...variantData } = data;

    // Find the attribute entity (from variant-attribute.entity.ts)
    // Assume you have a VariantAttributeRepository injected as this.variantAttributeRepository
    // If not, you need to inject it in the constructor
    // For this rewrite, let's assume it's available

    // Find the attribute entity
    const attribute = attributeId
      ? await (this as any).variantAttributeRepository.findOne({ where: { id: attributeId }, relations: ['values'] })
      : undefined;

    if (attributeId && !attribute) {
      throw new Error('Variant attribute not found');
    }

    const variant = this.productVariantRepository.create({
      ...variantData,
      attribute: attribute ? attribute : undefined,
    });
    const savedVariant = await this.productVariantRepository.save(variant);

    if (values && values.length > 0 && attribute) {
      const allowedValues = (attribute.values || []).filter(v => values.includes(v.id));
      savedVariant.values = allowedValues;
      await this.productVariantRepository.save(savedVariant);
    }

    const result = await this.productVariantRepository.findOne({
      where: { id: savedVariant.id },
      relations: ['values', 'attribute'],
    });

    return plainToInstance(
      ProductVariantResponseDto,
      {
        ...result,
        values: result?.values?.map(v => v.id) || [],
        attribute: result?.attribute,
      },
      { excludeExtraneousValues: true }
    );
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
    // According to product-variant.entity.ts, values is a JSONB column storing VariantValueEntity[]
    const { values, ...updateData } = data;
    // Update the basic fields (sku, price, productId, etc.)
    await this.productVariantRepository.update(id, updateData);

    if (values) {
      // Find the variant
      const variant = await this.productVariantRepository.findOne({
        where: { id },
        relations: ['attribute'],
      });
      if (!variant) return null;

      // Find the allowed values from the attribute
      let allowedValues = [];
      if (variant.attribute && Array.isArray(variant.attribute.values)) {
        allowedValues = (variant.attribute.values as any[]).filter((v) => values.includes(v.id));
      }

      // Update the values JSONB column directly
      variant.values = allowedValues;
      await this.productVariantRepository.save(variant);
    }

    const updatedVariant = await this.productVariantRepository.findOne({
      where: { id },
      relations: ['values', 'attribute'],
    });
    if (!updatedVariant) return null;
    return plainToInstance(
      ProductVariantResponseDto,
      {
        ...updatedVariant,
        values: updatedVariant.values?.map((v: any) => v.id) || [],
        attribute: updatedVariant.attribute,
      },
      { excludeExtraneousValues: true }
    );
  }

  async remove(id: string): Promise<void> {
    
    await this.productVariantRepository.delete(id);
  }
} 