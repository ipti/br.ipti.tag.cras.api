import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  
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
}
