import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProductVariantService } from './service/product-variant.service';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';

@Controller('product-variant')
export class ProductVariantController {
  constructor(private readonly productVariantService: ProductVariantService) {}

  @Post()
  async create(@Body() data: CreateProductVariantDto) {
    return this.productVariantService.create(data);
  }

  @Get()
  async findAll(@Query() query: any) {
    return this.productVariantService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productVariantService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateProductVariantDto) {
    return this.productVariantService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.productVariantService.remove(id);
    return { deleted: true };
  }
} 