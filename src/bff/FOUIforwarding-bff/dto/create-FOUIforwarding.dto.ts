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
  @IsString()
  forwading: number;
}
