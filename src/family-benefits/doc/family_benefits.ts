import { ApiProperty } from '@nestjs/swagger';

export class FamilyBenefitsDocument {
  @ApiProperty({ type: Number })
  family: number;

  @ApiProperty({ type: Number })
  benefits: number;

  @ApiProperty({ type: Number })
  value: number;
}
