import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  @IsNumber()
  edcenso_uf_fk: number;

  @IsNotEmpty()
  @IsNumber()
  edcenso_city_fk: number;

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
  @IsString()
  rooms: number;

  @IsNotEmpty()
  @IsNumber()
  rent_value: number;
}
