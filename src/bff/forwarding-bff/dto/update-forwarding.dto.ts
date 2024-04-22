import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ForwadingType, Status_document } from '@prisma/client';

export class UpdateForwardingDto{
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsBoolean()
    canDelete: boolean;

    @IsOptional()
    @IsEnum(ForwadingType)
    type: ForwadingType;

}
