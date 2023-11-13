import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFamilyDto {
  @IsNotEmpty()
  @IsNumber()
  family_representative_fk: number;

  @IsNotEmpty()
  @IsNumber()
  address: number;

  @IsNotEmpty()
  @IsNumber()
  attendance_unity: number;

  @IsNotEmpty()
  @IsNumber()
  vulnerability: number;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
