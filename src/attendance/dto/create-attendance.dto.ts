import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAttendanceDto {
  @IsNotEmpty()
  @IsNumber()
  user_identify_fk: number;

  @IsNotEmpty()
  @IsNumber()
  technician_fk: number;

  @IsNotEmpty()
  @IsString()
  solicitation: string;

  @IsNotEmpty()
  @IsString()
  providence: string;

  @IsNotEmpty()
  @IsString()
  result: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}