import { ApiProperty } from '@nestjs/swagger';

export class UserIdentifyDocument {
    @ApiProperty()
    readonly vulnerability_fk: number;
    
    @ApiProperty()
    readonly family_fk: number;
    
    @ApiProperty()
    readonly name: string;
    
    @ApiProperty()
    readonly surname: string;
    
    @ApiProperty()
    readonly folder: string;
    
    @ApiProperty()
    readonly archive: string;
    
    @ApiProperty()
    readonly number: string;
    
    @ApiProperty()
    readonly birthday: string;
    
    @ApiProperty()
    readonly birth_certificate: number;
    
    @ApiProperty()
    readonly nis: number;
    
    @ApiProperty()
    readonly rg_number: string;
    
    @ApiProperty()
    readonly rg_date_emission: string;
    
    @ApiProperty()
    readonly uf_rg: string;
    
    @ApiProperty()
    readonly emission_rg: string;
    
    @ApiProperty()
    readonly cpf: string;
    
    @ApiProperty()
    readonly is_deficiency: boolean;
    
    @ApiProperty()
    readonly deficiency: string;
    
    @ApiProperty()
    readonly filiation_1: string;
    
    @ApiProperty()
    readonly filiation_2?: string;
    
    @ApiProperty()
    readonly marital_status: string;
    
    @ApiProperty()
    readonly escolarity: string;
    
    @ApiProperty()
    readonly initial_date: string;
    
    @ApiProperty()
    readonly final_date: string;
    
    @ApiProperty()
    readonly profission: string;
    
    @ApiProperty()
    readonly income: number;

    @ApiProperty()
    readonly kinship: string;

    @ApiProperty()
    readonly signed_portfolio: boolean;

    @ApiProperty()
    readonly nuclear_family: string;
}