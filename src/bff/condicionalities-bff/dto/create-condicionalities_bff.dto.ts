import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCondicionalitiesBffDto {

  @IsNotEmpty()
  @IsNumber()
  family: number;

  @IsNotEmpty()
  @IsBoolean()
  vaccination_schedule: boolean;

  @IsNotEmpty()
  @IsBoolean()
  nutritional_status: boolean;

  @IsNotEmpty()
  @IsBoolean()
  prenatal: boolean;

  @IsNotEmpty()
  @IsBoolean()
  school_frequency: boolean;

  @IsNotEmpty()
  @IsString()
  familyId: string;
}
