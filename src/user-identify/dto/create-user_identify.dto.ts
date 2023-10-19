import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserIdentifyDto {
  @IsNotEmpty()
  @IsNumber()
  vulnerability_fk: number;

  @IsOptional()
  @IsNumber()
  family_fk: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
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

  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsNotEmpty()
  @IsBoolean()
  is_deficiency: boolean;

  @IsNotEmpty()
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
  @IsString()
  initial_date: string;

  @IsOptional()
  @IsString()
  final_date: string;

  @IsOptional()
  @IsString()
  profission: string;

  @IsNotEmpty()
  @IsNumber()
  income: number;
}
