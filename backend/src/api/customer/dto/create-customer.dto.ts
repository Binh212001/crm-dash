import { IsString, IsEmail, IsOptional, IsNumber, IsDateString, IsArray } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  postalCode?: string;

  @IsOptional()
  @IsNumber()
  orders?: number;

  @IsOptional()
  @IsNumber()
  totalSpent?: number;

  @IsOptional()
  @IsDateString()
  lastSeen?: Date;

  @IsOptional()
  @IsDateString()
  lastOrder?: Date;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
} 