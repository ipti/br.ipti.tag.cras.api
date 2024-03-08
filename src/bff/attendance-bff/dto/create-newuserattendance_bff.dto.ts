import { Result } from '@prisma/client';
import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAttendanceNewUserBffDto {
  @IsNotEmpty()
  @IsNumber()
  user_identify: number;

  @IsNotEmpty()
  @IsNumber()
  technician: number;

  @IsNotEmpty()
  @IsNumber()
  task: number;

  @IsNotEmpty()
  @IsNumber()
  attendance_unity: number;

  @IsNotEmpty()
  @IsString()
  solicitation: string;

  @IsOptional()
  @IsString()
  providence: string;

  @IsNotEmpty()
  @IsEnum(Result)
  result: Result;

  @IsNotEmpty()
  @IsString()
  nome: string;
  
  @IsOptional()
  @IsString()
  cpf: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsISO8601()
  date: Date;
}
