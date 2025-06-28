import { Injectable } from '@nestjs/common';
import { BaseService } from '@/api/base/base.service';
import { PermissionRepository } from './repositories/permission.repository';
import { PermissionEntity } from './entities/permission.entity';
import { PermissionResponseDto } from './dto/permission-response.dto';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ListPermissionDto } from './dto/list-permission.dto';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { plainToInstance } from 'class-transformer';
import { ILike } from 'typeorm';
import { paginate } from '@/utils/offset-pagination';

@Injectable()
export class PermissionService extends BaseService<
  PermissionEntity,
  PermissionResponseDto,
  CreatePermissionDto,
  UpdatePermissionDto,
  ListPermissionDto
> {
  constructor(private readonly permissionRepository: PermissionRepository) {
    super(permissionRepository);
  }

  async findAll(dto: ListPermissionDto): Promise<OffsetPaginatedDto<PermissionResponseDto>> {
    const queryBuilder = this.permissionRepository
      .createQueryBuilder('permission')
      .orderBy('permission.createdAt', 'DESC');

    if (dto.search) {
      queryBuilder.where([
        { name: ILike(`%${dto.search}%`) },
        { description: ILike(`%${dto.search}%`) },
      ]);
    }

    const [permissions, meta] = await paginate<PermissionEntity>(queryBuilder, dto, {
      skipCount: false,
      takeAll: false,
    });
    
    return new OffsetPaginatedDto(
      plainToInstance(PermissionResponseDto, permissions),
      meta
    );
  }

  async findOne(id: string): Promise<PermissionResponseDto> {
    const permission = await this.permissionRepository.findOne({
      where: { id },
      relations: ['roles'],
    });

    if (!permission) {
      throw new Error('Permission not found');
    }

    return plainToInstance(PermissionResponseDto, permission);
  }

  async create(dto: CreatePermissionDto): Promise<PermissionResponseDto> {
    const permission = this.permissionRepository.create(dto);
    const savedPermission = await this.permissionRepository.save(permission);
    return plainToInstance(PermissionResponseDto, savedPermission);
  }

  async update(id: string, dto: UpdatePermissionDto): Promise<PermissionResponseDto> {
    await this.permissionRepository.findOneByOrFail({ id });
    await this.permissionRepository.update(id, dto);
    const updatedPermission = await this.permissionRepository.findOneByOrFail({ id });
    return plainToInstance(PermissionResponseDto, updatedPermission);
  }

  async remove(id: string): Promise<void> {
    const permission = await this.permissionRepository.findOneByOrFail({ id });
    await this.permissionRepository.softDelete(id);
  }
} 