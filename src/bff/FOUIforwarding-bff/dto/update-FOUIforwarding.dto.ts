import { ForwadingType, Status_document } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateFOUIForwardingDto {
  @IsOptional()
  @IsNumber()
  family: number;

  @IsOptional()
  @IsNumber()
  user_identify: number;

  @IsOptional()
  @IsNumber()
  forwading: number;

  @IsOptional()
  @IsNumber()
  attendance_unity: number;

  @IsOptional()
  @IsString()
  description: string

  @IsOptional()
  @IsString()
  report: string;

  @IsOptional()
  @IsEnum(Status_document)
  status: Status_document;

  @IsOptional()
  @IsISO8601()
  date: string;
}
