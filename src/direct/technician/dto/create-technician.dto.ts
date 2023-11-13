import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTechnicianDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  user: number;

  @IsNotEmpty()
  @IsNumber()
  attendance_unity: number;
}
