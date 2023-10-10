import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAttendanceUnityDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  address_fk: number;
}
