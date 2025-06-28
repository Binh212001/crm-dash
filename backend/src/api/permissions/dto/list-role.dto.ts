import { IsOptional, IsString } from 'class-validator';
import { PageOptionsDto } from '@/common/dto/offset-pagination/page-options.dto';

export class ListRoleDto extends PageOptionsDto {
  @IsOptional()
  @IsString()
  search?: string;
} 