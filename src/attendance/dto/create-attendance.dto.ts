import {
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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

  @IsOptional()
  @IsISO8601()
  date: Date;
}
