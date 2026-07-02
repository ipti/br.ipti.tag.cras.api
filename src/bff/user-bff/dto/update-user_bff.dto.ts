import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Role } from '@prisma/client';

export class UpdateUserBffDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  attendance_unity_ids?: number[];
}
