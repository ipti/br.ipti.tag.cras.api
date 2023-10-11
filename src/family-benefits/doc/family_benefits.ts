import { ApiProperty } from '@nestjs/swagger';

export class FamilyBenefitsDocument {
  @ApiProperty({ type: Number })
  family_fk: number;

  @ApiProperty({ type: Number })
  benefits_fk: number;

  @ApiProperty({ type: Number })
  value: number;
}
