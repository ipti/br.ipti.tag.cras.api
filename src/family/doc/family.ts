import { ApiProperty } from '@nestjs/swagger';

export class FamilyDocument {
    @ApiProperty({
        type: Number,
        description: 'Identificador do representante da família',
        required: true,
    })
    family_representative_fk: number;
    
    @ApiProperty({
        type: Number,
        description: 'Identificador do endereço',
        required: true,
    })
    address: number;
    
    @ApiProperty({
        type: Number,
        description: 'Identificador da unidade de atendimento',
        required: true,
    })
    attendance_unity: number;

    @ApiProperty({
        type: Number,
        description: 'Identificador da vulnerabilidade',
        required: true,
    })
    vulnerability: number;
}