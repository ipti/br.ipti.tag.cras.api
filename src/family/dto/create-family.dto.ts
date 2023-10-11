import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFamilyDto {
  @IsNotEmpty()
  @IsNumber()
  family_representative_fk: number;

  @IsNotEmpty()
  @IsNumber()
  address_fk: number;

  @IsNotEmpty()
  @IsNumber()
  attendance_unity_fk: number;
}
