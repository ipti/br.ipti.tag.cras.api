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
import { BenefitsForFamily } from '../../../utils/types';
import { CadSUAS, Kinship } from '@prisma/client';

export class CreateAttendanceUnityAndAddressDto {
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  telephone: string;

  @IsNotEmpty()
  @IsString()
  reference: string;

  @IsNotEmpty()
  @IsString()
  conditions: string;

  @IsNotEmpty()
  @IsString()
  construction_type: string;

  @IsNotEmpty()
  @IsNumber()
  rooms: number;

  @IsNotEmpty()
  @IsNumber()
  rent_value: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  unity_number: string;

  @IsNotEmpty()
  @IsEnum(CadSUAS)
  type: CadSUAS;

  @IsOptional()
  @IsString()
  email: string;
}
