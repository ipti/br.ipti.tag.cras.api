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

export class CreateForwardingDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsISO8601()
  date: string;

  @IsOptional()
  @IsBoolean()
  canDelete: boolean;

  @IsNotEmpty()
  @IsEnum(ForwadingType)
  type: ForwadingType;
}
