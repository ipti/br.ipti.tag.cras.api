import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFamilyBenefitsDto {
  @IsNotEmpty()
  @IsNumber()
  family_fk: number;

  @IsNotEmpty()
  @IsNumber()
  benefits_fk: number;

  @IsNotEmpty()
  @IsNumber()
  value: number;
}
