import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { CreateBaseReqDto } from '@/api/base/dto/create-base.req.dto';

export class CreatePermissionDto extends CreateBaseReqDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  description?: string;
} 