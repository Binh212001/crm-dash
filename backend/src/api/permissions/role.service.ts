import { Injectable } from '@nestjs/common';
import { BaseService } from '@/api/base/base.service';
import { RoleRepository } from './repositories/role.repository';
import { PermissionRepository } from './repositories/permission.repository';
import { RoleEntity } from './entities/role.entity';
import { RoleResponseDto } from './dto/role-response.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ListRoleDto } from './dto/list-role.dto';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { plainToInstance } from 'class-transformer';
import { ILike, In } from 'typeorm';
import { paginate } from '@/utils/offset-pagination';

@Injectable()
export class RoleService extends BaseService<
  RoleEntity,
  RoleResponseDto,
  CreateRoleDto,
  UpdateRoleDto,
  ListRoleDto
> {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly permissionRepository: PermissionRepository,
  ) {
    super(roleRepository);
  }

  async findAll(dto: ListRoleDto): Promise<OffsetPaginatedDto<RoleResponseDto>> {
    const queryBuilder = this.roleRepository
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.permissions', 'permissions')
      .orderBy('role.createdAt', 'DESC');

    if (dto.search) {
      queryBuilder.where([
        { name: ILike(`%${dto.search}%`) },
        { description: ILike(`%${dto.search}%`) },
      ]);
    }

    const [roles, meta] = await paginate<RoleEntity>(queryBuilder, dto, {
      skipCount: false,
      takeAll: false,
    });
    
    return new OffsetPaginatedDto(
      plainToInstance(RoleResponseDto, roles),
      meta
    );
  }

  async findOne(id: string): Promise<RoleResponseDto> {
    const role = await this.roleRepository.findOne({
      where: { id },
      relations: ['permissions', 'users'],
    });

    if (!role) {
      throw new Error('Role not found');
    }

    return plainToInstance(RoleResponseDto, role);
  }

  async create(dto: CreateRoleDto): Promise<RoleResponseDto> {
    const { permissionIds, ...roleData } = dto;
    
    const role = this.roleRepository.create(roleData);
    
    if (permissionIds && permissionIds.length > 0) {
      const permissions = await this.permissionRepository.find({
        where: { id: In(permissionIds) },
      });
      role.permissions = permissions;
    }
    
    const savedRole = await this.roleRepository.save(role);
    return plainToInstance(RoleResponseDto, savedRole);
  }

  async update(id: string, dto: UpdateRoleDto): Promise<RoleResponseDto> {
    const { permissionIds, ...roleData } = dto;
    
    await this.roleRepository.findOneByOrFail({ id });
    
    if (permissionIds !== undefined) {
      const permissions = permissionIds.length > 0 
        ? await this.permissionRepository.find({ where: { id: In(permissionIds) } })
        : [];
      
      await this.roleRepository
        .createQueryBuilder()
        .relation(RoleEntity, 'permissions')
        .of(id)
        .addAndRemove(permissions, []);
    }
    
    await this.roleRepository.update(id, roleData);
    const updatedRole = await this.roleRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });
    
    return plainToInstance(RoleResponseDto, updatedRole);
  }

  async remove(id: string): Promise<void> {
    const role = await this.roleRepository.findOneByOrFail({ id });
    await this.roleRepository.softDelete(id);
  }
} 