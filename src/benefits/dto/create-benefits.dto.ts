import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Benefits } from '../../utils/enum';

export class CreateBenefitsDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(Benefits, { message: 'Invalid type. Type must be PERIODICO, EVENTUAL.'})
  type: Benefits;
}
