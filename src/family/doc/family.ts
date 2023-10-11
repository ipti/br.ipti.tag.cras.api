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
    address_fk: number;
    
    @ApiProperty({
        type: Number,
        description: 'Identificador da unidade de atendimento',
        required: true,
    })
    attendance_unity_fk: number;
}