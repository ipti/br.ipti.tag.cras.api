import {
  IsBoolean,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTechnicianVisitsDto {
  @IsNotEmpty()
  @IsNumber()
  family: number;

  @IsOptional()
  @IsNumber()
  attendance: number;

  @IsNotEmpty()
  @IsNumber()
  attendance_unity: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsISO8601()
  created_at: string;
}
