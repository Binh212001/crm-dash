import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ListPermissionDto } from './dto/list-permission.dto';
import { PermissionResponseDto } from './dto/permission-response.dto';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  async create(@Body() data: CreatePermissionDto): Promise<PermissionResponseDto> {
    return this.permissionService.create(data);
  }

  @Get()
  async findAll(@Query() dto: ListPermissionDto): Promise<OffsetPaginatedDto<PermissionResponseDto>> {
    return this.permissionService.findAll(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PermissionResponseDto> {
    return this.permissionService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdatePermissionDto): Promise<PermissionResponseDto> {
    return this.permissionService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ deleted: boolean }> {
    await this.permissionService.remove(id);
    return { deleted: true };
  }
} 