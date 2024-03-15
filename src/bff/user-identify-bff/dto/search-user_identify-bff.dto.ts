import {
    IsOptional,
    IsString,
  } from 'class-validator';

export class SeatchUserByNameOrCPFDto {
    @IsOptional()
    @IsString()
    name: string;
  
    @IsOptional()
    @IsString()
    cpf: string;

}