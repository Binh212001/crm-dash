import { RoleResponseDto } from '@/api/permissions/dto/role-response.dto';
import { Expose, Type } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  phoneNumber?: string;

  @Expose()
  address?: string;

  @Expose()
  dateOfBirth?: Date;

  @Expose()
  bio?: string;

  @Expose()
  avatar?: any;

  @Type(()=>RoleResponseDto)
  role : RoleResponseDto
} 