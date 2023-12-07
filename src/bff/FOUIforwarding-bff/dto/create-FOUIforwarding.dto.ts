import { ForwadingType } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateFOUIForwardingDto {
  @IsOptional()
  @IsNumber()
  family: number;

  @IsOptional()
  @IsNumber()
  user_identify: number;

  @IsNotEmpty()
  @IsNumber()
  forwading: number;

  @IsNotEmpty()
  @IsNumber()
  attendance_unity: number;

  @IsOptional()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsISO8601()
  date: string;
}
