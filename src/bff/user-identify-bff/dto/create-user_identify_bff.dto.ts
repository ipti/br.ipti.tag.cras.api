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
import { Kinship } from '@prisma/client';

export class CreateUserIdentifyWithoutFamilyDto {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  surname: string;

  @IsOptional()
  @IsString()
  folder?: string;

  @IsOptional()
  @IsString()
  archive?: string;

  @IsOptional()
  @IsString()
  number?: string;

  @IsOptional()
  @IsString()
  birthday?: string;

  @IsOptional()
  @IsNumber()
  birth_certificate?: number;

  @IsOptional()
  @IsNumber()
  nis?: number;

  @IsOptional()
  @IsString()
  rg_number?: string;

  @IsOptional()
  @IsString()
  rg_date_emission?: string;

  @IsOptional()
  @IsString()
  uf_rg?: string;

  @IsOptional()
  @IsString()
  emission_rg?: string;

  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsNotEmpty()
  @IsBoolean()
  is_deficiency: boolean;

  @IsOptional()
  @IsString()
  deficiency: string;

  @IsNotEmpty()
  @IsString()
  filiation_1: string;

  @IsOptional()
  @IsString()
  filiation_2: string;

  @IsNotEmpty()
  @IsString()
  marital_status: string;

  @IsNotEmpty()
  @IsString()
  escolarity: string;

  @IsNotEmpty()
  @IsISO8601()
  initial_date: string;

  @IsOptional()
  @IsISO8601()
  final_date?: string;

  @IsOptional()
  @IsString()
  profission?: string;

  @IsNotEmpty()
  @IsNumber()
  income: number;

  @IsOptional()
  @IsBoolean()
  signed_portfolio: boolean;

  @IsOptional()
  @IsString()
  nuclear_family: string;

  @IsNotEmpty()
  @IsNumber()
  attendance_unity: number;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  telephone: string;

  @IsOptional()
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
  @IsBoolean()
  irregular_ocupation: boolean;

  @IsNotEmpty()
  @IsBoolean()
  alone_child: boolean;

  @IsNotEmpty()
  @IsBoolean()
  dependent_elderly: boolean;

  @IsNotEmpty()
  @IsBoolean()
  unemployed: boolean;

  @IsNotEmpty()
  @IsBoolean()
  deficient: boolean;

  @IsNotEmpty()
  @IsBoolean()
  low_income: boolean;

  @IsNotEmpty()
  @IsBoolean()
  others: boolean;

  @IsNotEmpty()
  @IsArray()
  benefitsForFamily: Array<BenefitsForFamily>;
}

export class CreateUserIdentifyWithFamilyDto {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  surname: string;

  @IsOptional()
  @IsString()
  folder?: string;

  @IsOptional()
  @IsString()
  archive?: string;

  @IsOptional()
  @IsString()
  number?: string;

  @IsOptional()
  @IsString()
  birthday?: string;

  @IsOptional()
  @IsNumber()
  birth_certificate?: number;

  @IsOptional()
  @IsNumber()
  nis?: number;

  @IsOptional()
  @IsString()
  rg_number?: string;

  @IsOptional()
  @IsString()
  rg_date_emission?: string;

  @IsOptional()
  @IsString()
  uf_rg?: string;

  @IsOptional()
  @IsString()
  emission_rg?: string;

  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsNotEmpty()
  @IsBoolean()
  is_deficiency: boolean;

  @IsOptional()
  @IsString()
  deficiency: string;

  @IsNotEmpty()
  @IsString()
  filiation_1: string;

  @IsOptional()
  @IsString()
  filiation_2: string;

  @IsNotEmpty()
  @IsString()
  marital_status: string;

  @IsNotEmpty()
  @IsString()
  escolarity: string;

  @IsNotEmpty()
  @IsISO8601()
  initial_date: string;

  @IsOptional()
  @IsISO8601()
  final_date?: string;

  @IsOptional()
  @IsString()
  profission?: string;

  @IsNotEmpty()
  @IsNumber()
  income: number;

  @IsOptional()
  @IsBoolean()
  signed_portfolio: boolean;

  @IsOptional()
  @IsString()
  nuclear_family: string;

  @IsNotEmpty()
  @IsNumber()
  family: number;

  @IsNotEmpty()
  @IsEnum(Kinship)
  kinship: Kinship;
}