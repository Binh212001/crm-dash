import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../repository/product.repository';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { VariantAttributeRepository } from '../repository/variant-attribute.repository';
import { VariantValueRepository } from '../repository/variant-value.repository';
import { ProductVariantRepository } from '../repository/product-variant.repository';
import { ProductResponseDto } from '../dto/product-response';
import { plainToInstance } from 'class-transformer';
import { TagRepository } from '@/api/tag/tag.repository';
import { In } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly variantAttributeRepository: VariantAttributeRepository,
    private readonly variantValueRepository: VariantValueRepository,
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
          product: prSave
        });
        prVariants.push(prVariant);
      }
      await this.productVariantRepository.save(prVariants);
    }
    const res = await this.productRepository.findOne({
      where: { id: product.id },
      relations: ['productVariant', 'productVariant.attribute', 'productVariant.values'],
    });

    return plainToInstance(ProductResponseDto, res);
  }

  async findAll() {
    const products = await this.productRepository.find({
      relations: ['productVariant', 'productVariant.attribute', 'productVariant.values'],
    });
    return plainToInstance(ProductResponseDto, products);
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['productVariant', 'productVariant.attribute', 'productVariant.values'],
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
      relations: ['productVariant', 'productVariant.attribute', 'productVariant.values'],
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