import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTechnicianDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  user_fk: number;
}
