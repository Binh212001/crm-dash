import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { paginate } from '@/utils/offset-pagination';
import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.dto';
import { ListUserDto } from './dto/list-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(
    @Inject('EMAIL_SERVICE') 
    private readonly client: ClientProxy,
    private readonly userRepository: UserRepository,
  ) {}

  async create(data: CreateUserDto): Promise<UserResponseDto> {
    const user = this.userRepository.create(data);
    const savedUser = await this.userRepository.save(user);
    return plainToInstance(UserResponseDto, savedUser, { excludeExtraneousValues: true });
  }

  async findAll( reqDto: ListUserDto): Promise<OffsetPaginatedDto<UserResponseDto>> {
    const{q} = reqDto
    const query = this.userRepository
    .createQueryBuilder('user')
    .orderBy('user.id', 'DESC');
    if(q){
    query.andWhere(
      '(user.username ILIKE :q OR user.email ILIKE :q OR user.phoneNumber ILIKE :q)',
      { q: `%${q}%` }
    );
    }
  const [base, metaDto] = await paginate<UserEntity>(query, reqDto, {
    skipCount: false,
    takeAll: false,
  });
  
  // Send email notification asynchronously
  try {
    this.client.emit(
      { exchange: 'send_email', routingKey: 'info' },
      { message: 'Log with info level' },
    );
  } catch (error) {
    console.error('❌ Error sending email notification:', error);
  }
  
  return new OffsetPaginatedDto(plainToInstance(UserResponseDto, base), metaDto);
  }

  async findOne(id: string): Promise<UserResponseDto | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    
    if (!user) return null;
    return plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true });
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findByIdWithCache(id: string, relations: string[] = []): Promise<UserEntity | null> {
    return await this.userRepository.findOne({ 
      where: { id },
      relations: relations
    });
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