import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTechnicianDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  user_fk: number;
}
