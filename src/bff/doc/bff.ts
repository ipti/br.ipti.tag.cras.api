import { ApiProperty } from '@nestjs/swagger';
import { BenefitsForFamily } from '../../utils/types';
import { Kinship } from '@prisma/client';

export class UserIdentifyWithoutFamily {
  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  folder?: string;

  @ApiProperty()
  archive?: string;

  @ApiProperty()
  number?: string;

  @ApiProperty()
  birthday?: string;

  @ApiProperty()
  birth_certificate?: number;

  @ApiProperty()
  nis?: number;

  @ApiProperty()
  rg_number?: string;

  @ApiProperty()
  rg_date_emission?: string;

  @ApiProperty()
  uf_rg?: string;

  @ApiProperty()
  emission_rg?: string;

  @ApiProperty()
  cpf: string;

  @ApiProperty()
  is_deficiency: boolean;

  @ApiProperty()
  deficiency: string;

  @ApiProperty()
  filiation_1: string;

  @ApiProperty()
  filiation_2?: string;

  @ApiProperty()
  marital_status: string;

  @ApiProperty()
  escolarity: string;

  @ApiProperty()
  initial_date: string;

  @ApiProperty()
  final_date?: string;

  @ApiProperty()
  profission?: string;

  @ApiProperty()
  income: number;

  @ApiProperty()
  kinship: string;

  @ApiProperty()
  signed_portfolio: boolean;

  @ApiProperty()
  nuclear_family: string;

  @ApiProperty()
  address: number;

  @ApiProperty()
  attendance_unity: number;

  @ApiProperty()
  telephone: string;

  @ApiProperty()
  reference: string;

  @ApiProperty()
  conditions: string;

  @ApiProperty()
  construction_type: string;

  @ApiProperty()
  rooms: string;

  @ApiProperty()
  rent_value: number;

  @ApiProperty()
  irregular_ocupation: boolean;

  @ApiProperty()
  alone_child: boolean;

  @ApiProperty()
  dependent_elderly: boolean;

  @ApiProperty()
  unemployed: boolean;

  @ApiProperty()
  deficient: boolean;

  @ApiProperty()
  low_income: boolean;

  @ApiProperty()
  others: boolean;

  @ApiProperty()
  benefitsForFamily: BenefitsForFamily[];
}

export class UserIdentifyWithFamily {
  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  folder?: string;

  @ApiProperty()
  archive?: string;

  @ApiProperty()
  number?: string;

  @ApiProperty()
  birthday?: string;

  @ApiProperty()
  birth_certificate?: number;

  @ApiProperty()
  nis?: number;

  @ApiProperty()
  rg_number?: string;

  @ApiProperty()
  rg_date_emission?: string;

  @ApiProperty()
  uf_rg?: string;

  @ApiProperty()
  emission_rg?: string;

  @ApiProperty()
  cpf: string;

  @ApiProperty()
  is_deficiency: boolean;

  @ApiProperty()
  deficiency: string;

  @ApiProperty()
  filiation_1: string;

  @ApiProperty()
  filiation_2?: string;

  @ApiProperty()
  marital_status: string;

  @ApiProperty()
  escolarity: string;

  @ApiProperty()
  initial_date: string;

  @ApiProperty()
  final_date?: string;

  @ApiProperty()
  profission?: string;

  @ApiProperty()
  income: number;

  @ApiProperty()
  kinship: string;

  @ApiProperty()
  signed_portfolio: boolean;

  @ApiProperty()
  nuclear_family: string;

  @ApiProperty()
  family: number;

  @ApiProperty()
  benefitsForFamily: BenefitsForFamily[];
}

export class AttendanceUnityAndAddress {
  @ApiProperty()
  address: string;

  @ApiProperty()
  telephone: string;

  @ApiProperty()
  reference: string;

  @ApiProperty()
  conditions: string;

  @ApiProperty()
  construction_type: string;

  @ApiProperty()
  rooms: number;

  @ApiProperty()
  rent_value: number;

  @ApiProperty()
  name: string;
}
