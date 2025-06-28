import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { CreateBaseReqDto } from '@/api/base/dto/create-base.req.dto';

export class CreateRoleDto extends CreateBaseReqDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  description?: string;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  permissionIds?: string[];
} 