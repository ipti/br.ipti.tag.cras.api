import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { CadSUAS } from '@prisma/client';

export class UpdateAttendanceUnityAndAddressDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  unity_number?: string;

  @IsOptional()
  @IsEnum(CadSUAS)
  type?: CadSUAS;

  @IsOptional()
  @IsString()
  email?: string;

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

  @IsOptional()
  @IsNumber()
  edcenso_city_fk?: number;
}
