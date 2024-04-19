import { ForwadingType, Status_document } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateForwardingDto {
  @IsNotEmpty()
  @IsString()
  name: string;



  @IsOptional()
  @IsBoolean()
  canDelete: boolean;

  @IsNotEmpty()
  @IsEnum(ForwadingType)
  type: ForwadingType;

  @IsNotEmpty()
  @IsEnum(Status_document)
  status: Status_document;
}
