import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToInstance } from 'class-transformer';
import { paginate } from '@/utils/offset-pagination';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { ListUserDto } from './dto/list-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,

  ) {}

  async create(data: CreateUserDto): Promise<UserResponseDto> {
    const user = this.userRepository.create(data);
    const savedUser = await this.userRepository.save(user);
    return plainToInstance(UserResponseDto, savedUser, { excludeExtraneousValues: true });
  }

  async findAll( reqDto: ListUserDto): Promise<OffsetPaginatedDto<UserResponseDto>> {
    const query = this.userRepository
    .createQueryBuilder('user')
    .orderBy('user.id', 'DESC');
  const [base, metaDto] = await paginate<UserEntity>(query, reqDto, {
    skipCount: false,
    takeAll: false,
  });
  return new OffsetPaginatedDto(plainToInstance(UserResponseDto, base), metaDto);
  }

  async findOne(id: string): Promise<UserResponseDto | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    
    if (!user) return null;
    return plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true });
  }

  async update(id: string, data: UpdateUserDto): Promise<UserResponseDto | null> {
    await this.userRepository.update(id, data);
    const updatedUser = await this.userRepository.findOne({ where: { id } });
    if (!updatedUser) return null;
    return plainToInstance(UserResponseDto, updatedUser, { excludeExtraneousValues: true });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
} 