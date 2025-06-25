import { Expose } from 'class-transformer';

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
  image?: any;

  @Expose()
  numberOfCourse: number;

  @Expose()
  referCode?: string;

  @Expose()
  provider?: string;

  @Expose()
  socialId?: string;
} 