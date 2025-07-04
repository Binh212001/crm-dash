import { Module } from '@nestjs/common';
import { TagModule } from '../tag/tag.module';
import { CategoryController } from './category.controller';
import { ProductController } from './product.controller';
import { CategoryRepository } from './repository/category.repository';
import { CategoryService } from './service/category.service';
import { ProductService } from './service/product.service';
import { ProductRepository } from './repository/product.repository';


@Module({
  imports: [
    TagModule
  ],
  providers: [
    CategoryRepository,
    CategoryService,
    ProductService,
    ProductRepository
  ],
  controllers: [
    CategoryController,
    ProductController
  ],
  exports: [
    CategoryRepository,
    CategoryService,
    ProductService,
    ProductRepository
  ],
})
export class ProductModule {} 