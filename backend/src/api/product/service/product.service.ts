import { ListBaseReqDto } from '@/api/base/dto/list-base.req.dto';
import { TagRepository } from '@/api/tag/tag.repository';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { paginate } from '@/utils/offset-pagination';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { In } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductResponseDto } from '../dto/product-response';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductVariantRepository } from '../repository/product-variant.repository';
import { ProductRepository } from '../repository/product.repository';
import { VariantAttributeRepository } from '../repository/variant-attribute.repository';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly variantAttributeRepository: VariantAttributeRepository,
    private readonly productVariantRepository: ProductVariantRepository,
    private readonly tagRepository: TagRepository,
  ) {}

  async create(dto: CreateProductDto) {
    const { productVariant, tags = [], ...rest } = dto;
    const tagList = tags.length > 0
      ? await this.tagRepository.find({
          where: {
            id: In(tags)
          }
        })
      : [];
    const product = this.productRepository.create({
      ...rest,
      tags: tagList
    });
    const prSave = await this.productRepository.save(product);

    if (productVariant && productVariant.length > 0) {
      const prVariants = [];
      for (const pv of productVariant) {
        const variant = await this.variantAttributeRepository.findOne({
          where: { id: pv.attributeId }
        });
        if (!variant) {
          throw new BadRequestException("variant not exist");
        }
        const values = pv.values || [];
        const valueInput = (variant.values || []).filter((v) => values.includes(v.id));
        const prVariant = this.productVariantRepository.create({
          attribute: variant,
          values: valueInput,
          price: pv.price,
          product: prSave
        });
        prVariants.push(prVariant);
      }
      await this.productVariantRepository.save(prVariants);
    }
    const res = await this.productRepository.findOne({
      where: { id: product.id },
      relations: ['variants'],
  });

    return plainToInstance(ProductResponseDto, res);
  }

  async findAll(dto: ListBaseReqDto) {
    const query = this.productRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.variants', 'variant')
      .orderBy('product.id', 'DESC');

    const [base, metaDto] = await paginate(query, dto, {
      skipCount: false,
      takeAll: false,
    });

    return new OffsetPaginatedDto(
      plainToInstance(ProductResponseDto, base, { excludeExtraneousValues: true }),
      metaDto
    );
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['variants'],
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return plainToInstance(ProductResponseDto, product);
  }

  async update(id: string, dto: UpdateProductDto) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    Object.assign(product, dto);
    await this.productRepository.save(product);
    // Optionally update variants here if needed
    const updated = await this.productRepository.findOne({
      where: { id },
      relations: ['variants', 'variants.attribute', 'variants.values'],
    });
    return plainToInstance(ProductResponseDto, updated);
  }

  async remove(id: string) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await this.productRepository.remove(product);
    return { message: 'Product removed', id };
  }
} 