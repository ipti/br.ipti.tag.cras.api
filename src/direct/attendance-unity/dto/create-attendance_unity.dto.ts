import { CadSUAS } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAttendanceUnityDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  address: number;

  @IsOptional()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  unity_number: string;

  @IsNotEmpty()
  @IsEnum(CadSUAS)
  type: CadSUAS;
}
