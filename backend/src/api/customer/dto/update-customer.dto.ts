import { IsString, IsEmail, IsOptional, IsNumber, IsDateString } from 'class-validator';

export class UpdateCustomerDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsNumber()
  orders?: number;

  @IsOptional()
  @IsNumber()
  totalSpent?: number;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsDateString()
  lastSeen?: Date;

  @IsOptional()
  @IsDateString()
  lastOrder?: Date;

  @IsOptional()
  @IsString()
  avatar?: string;
} 