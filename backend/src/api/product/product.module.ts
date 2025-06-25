import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { CategoryEntity } from './entities/category.entity';
import { ProductVariantEntity } from './entities/product-variant.entity';
import { VariantAttributeEntity } from './entities/variant-attribute.entity';
import { VariantValueEntity } from './entities/variant-value.entity';
import { ProductRepository } from './repository/product.repository';
import { CategoryRepository } from './repository/category.repository';
import { ProductVariantRepository } from './repository/product-variant.repository';
import { VariantAttributeRepository } from './repository/variant-attribute.repository';
import { VariantValueRepository } from './repository/variant-value.repository';
import { ProductService } from './service/product.service';
import { CategoryService } from './service/category.service';
import { ProductVariantService } from './service/product-variant.service';
import { VariantAttributeService } from './service/variant-attribute.service';
import { CategoryController } from './category.controller';
import { ProductVariantController } from './product-variant.controller';
import { VariantAttributeController } from './variant-attribute.controller';

@Module({
  imports: [
    
  ],
  providers: [
    ProductRepository,
    CategoryRepository,
    ProductVariantRepository,
    VariantAttributeRepository,
    VariantValueRepository,
    ProductService,
    CategoryService,
    ProductVariantService,
    VariantAttributeService,
  ],
  controllers: [
    CategoryController,
    ProductVariantController,
    VariantAttributeController,
  ],
  exports: [
    ProductService,
    CategoryService,
    ProductVariantService,
    VariantAttributeService,
    ProductRepository,
    CategoryRepository,
    ProductVariantRepository,
    VariantAttributeRepository,
    VariantValueRepository,
  ],
})
export class ProductModule {} 