import { Kinship } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserIdentifyDto {
  @IsOptional()
  @IsNumber()
  family: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  surname: string;

  @IsOptional()
  @IsString()
  folder: string;

  @IsOptional()
  @IsString()
  archive: string;

  @IsOptional()
  @IsString()
  number: string;

  @IsOptional()
  @IsString()
  birthday: string;

  @IsOptional()
  @IsNumber()
  birth_certificate: number;

  @IsOptional()
  @IsNumber()
  nis: number;

  @IsOptional()
  @IsString()
  rg_number: string;

  @IsOptional()
  @IsString()
  rg_date_emission: string;

  @IsOptional()
  @IsString()
  uf_rg: string;

  @IsOptional()
  @IsString()
  emission_rg: string;

  @IsOptional()
  @IsString()
  cpf: string;

  @IsOptional()
  @IsBoolean()
  is_deficiency: boolean;

  @IsOptional()
  @IsString()
  deficiency: string;

  @IsOptional()
  @IsString()
  filiation_1: string;

  @IsOptional()
  @IsString()
  filiation_2: string;

  @IsOptional()
  @IsString()
  marital_status: string;

  @IsOptional()
  @IsString()
  escolarity: string;

  @IsNotEmpty()
  @IsString()
  initial_date: string;

  @IsOptional()
  @IsString()
  final_date: string;

  @IsOptional()
  @IsString()
  profission: string;

  @IsOptional()
  @IsNumber()
  income: number;

  @IsOptional()
  @IsEnum(Kinship)
  kinship: Kinship;

  @IsOptional()
  @IsBoolean()
  signed_portfolio: boolean;

  @IsOptional()
  @IsString()
  nuclear_family: string;
}
