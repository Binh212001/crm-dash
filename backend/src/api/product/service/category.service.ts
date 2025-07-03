import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repository/category.repository';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryResponseDto } from '../dto/category-response.dto';
import { plainToInstance } from 'class-transformer';
import { CategoryEntity } from '../entities/category.entity';
import { paginate } from '@/utils/offset-pagination';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { ProductEntity } from '../entities/product.entity';
import { ProductVariantEntity } from '../entities/product-variant.entity';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(data: CreateCategoryDto): Promise<CategoryResponseDto> {
    const category = this.categoryRepository.create(data);
    const savedCategory = await this.categoryRepository.save(category);
    return plainToInstance(CategoryResponseDto, savedCategory, { excludeExtraneousValues: true });
  }

  async findAll(reqDto: any): Promise<OffsetPaginatedDto<CategoryResponseDto>> {
    const query = this.categoryRepository.createQueryBuilder('category')
      .orderBy('category.id', 'DESC');
    const [base, metaDto] = await paginate<CategoryEntity>(query, reqDto, {
      skipCount: false,
      takeAll: false,
    });
    return new OffsetPaginatedDto(plainToInstance(CategoryResponseDto, base), metaDto);
  }

  async findOne(id: string): Promise<CategoryResponseDto | null> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: [
        'products',
        'products.variants',
        'products.variants.values',
        'products.variants.attribute',
      ],
    });
    if (!category) return null;
    return plainToInstance(CategoryResponseDto, category, { excludeExtraneousValues: true });
  }

  async update(id: string, data: UpdateCategoryDto): Promise<CategoryResponseDto | null> {
    await this.categoryRepository.update(id, data);
    const updatedCategory = await this.categoryRepository.findOne({ where: { id } });
    if (!updatedCategory) return null;
    return plainToInstance(CategoryResponseDto, updatedCategory, { excludeExtraneousValues: true });
  }

  async remove(id: string): Promise<void> {
    await this.categoryRepository.delete(id);
  }
} 