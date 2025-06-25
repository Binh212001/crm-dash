import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { VariantAttributeService } from './service/variant-attribute.service';
import { CreateVariantAttributeDto } from './dto/create-variant-attribute.dto';
import { UpdateVariantAttributeDto } from './dto/update-variant-attribute.dto';

@Controller('variant-attribute')
export class VariantAttributeController {
  constructor(private readonly variantAttributeService: VariantAttributeService) {}

  @Post()
  async create(@Body() data: CreateVariantAttributeDto) {
    return this.variantAttributeService.create(data);
  }

  @Get()
  async findAll(@Query() query: any) {
    return this.variantAttributeService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.variantAttributeService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateVariantAttributeDto) {
    return this.variantAttributeService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.variantAttributeService.remove(id);
    return { deleted: true };
  }
} 