import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ListTagDto } from './dto/list-tag.dto';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  async create(@Body() data: CreateTagDto) {
    return this.tagService.create(data);
  }

  @Get()
  async findAll(@Query() dto: ListTagDto) {
    return this.tagService.findAll(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.tagService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateTagDto) {
    return this.tagService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.tagService.remove(id);
    return { deleted: true };
  }
} 