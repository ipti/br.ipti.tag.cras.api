import {
  IsBoolean,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTechnicianVisitsDto {
  @IsNotEmpty()
  @IsNumber()
  family: number;

  @IsNotEmpty()
  @IsISO8601()
  created_at: string;
}
