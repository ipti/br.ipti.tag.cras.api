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
  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  telephone?: string;

  @IsOptional()
  @IsString()
  reference?: string;

  @IsOptional()
  @IsString()
  conditions?: string;

  @IsOptional()
  @IsString()
  construction_type?: string;

  @IsOptional()
  @IsNumber()
  rooms?: number;

  @IsOptional()
  @IsNumber()
  rent_value?: number;

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
  email?: string;

  @IsOptional()
  @IsNumber()
  edcenso_city_fk?: number;
}
