import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateHappyChildFamilyDto {
    @IsNotEmpty()
    @IsNumber()
    family: number;
    
    @IsNotEmpty()
    @IsNumber()
    child: number;
    
    @IsNotEmpty()
    @IsNumber()
    user_identify: number;
    
    @IsNotEmpty()
    @IsNumber()
    attendance_unity: number;
    
    @IsOptional()
    @IsString()
    description: string
    
    @IsOptional()
    @IsString()
    report: string;
    
    @IsOptional()
    @IsString()
    status: string;
    
    @IsOptional()
    @IsString()
    date: string;
}
