import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFamilyBenefitsDto {
  @IsNotEmpty()
  @IsNumber()
  family: number;

  @IsNotEmpty()
  @IsNumber()
  benefits: number;

  @IsNotEmpty()
  @IsNumber()
  value: number;
}
