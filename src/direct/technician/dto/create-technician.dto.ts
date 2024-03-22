import { TechnicianType } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTechnicianDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  user: number;

  @IsNotEmpty()
  @IsNumber()
  attendance_unity: number;

  @IsOptional()
  @IsString()
  professional_register: string;

  @IsOptional()
  @IsString()
  type: TechnicianType;
}
