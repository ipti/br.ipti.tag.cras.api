import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBenefitsDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;
}
