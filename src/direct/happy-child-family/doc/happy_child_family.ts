import { ApiProperty } from '@nestjs/swagger';

export class HappyChildFamilyDocument {
    @ApiProperty({ type: Number })
    family: number;
    
    @ApiProperty({ type: Number })
    child: number;
    
    @ApiProperty({ type: Number })
    user_identify: number;
    
    @ApiProperty({ type: Number })
    attendance_unity: number;
    
    @ApiProperty({ type: String })
    description: string;
    
    @ApiProperty({ type: String })
    report: string;
    
    @ApiProperty({ type: String })
    status: string;
    
    @ApiProperty({ type: String })
    date: string;
}
