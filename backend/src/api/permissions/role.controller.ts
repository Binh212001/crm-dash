import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ListRoleDto } from './dto/list-role.dto';
import { RoleResponseDto } from './dto/role-response.dto';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() data: CreateRoleDto): Promise<RoleResponseDto> {
    return this.roleService.create(data);
  }

  @Get()
  async findAll(@Query() dto: ListRoleDto): Promise<OffsetPaginatedDto<RoleResponseDto>> {
    return this.roleService.findAll(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RoleResponseDto> {
    return this.roleService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateRoleDto): Promise<RoleResponseDto> {
    return this.roleService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ deleted: boolean }> {
    await this.roleService.remove(id);
    return { deleted: true };
  }
} 