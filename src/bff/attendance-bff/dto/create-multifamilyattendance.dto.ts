import { Result } from '@prisma/client';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMultiFamilyAttendanceDto {
  @IsOptional()
  @IsNumber()
  technician: number;

  @IsNotEmpty()
  @IsNumber()
  task: number;

  @IsOptional()
  @IsNumber()
  attendance_unity: number;

  @IsOptional()
  @IsNumber()
  forwading: number;

  @IsNotEmpty()
  @IsString()
  solicitation: string;

  @IsNotEmpty()
  @IsString()
  providence: string;

  @IsNotEmpty()
  @IsEnum(Result)
  result: Result;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsISO8601()
  date: string;

  @IsNotEmpty()
  @IsArray()
  families: Array<number>;
}
