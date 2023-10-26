import { ApiProperty } from '@nestjs/swagger';

export class AttendanceUnityDocument {
    @ApiProperty({
        type: String,
        description: 'Nome da unidade',
        required: true,
    })
    name: string;
    
    @ApiProperty({
        type: Number,
        description: 'Identificador do endereço',
        required: true,
    })
    address: number;
}