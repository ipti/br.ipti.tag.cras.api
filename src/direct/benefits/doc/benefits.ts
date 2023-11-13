import { ApiProperty } from '@nestjs/swagger';

export class BenefitsDocument {
  @ApiProperty({
    type: String,
    description: 'Descrição do benefício',
    required: true,
  })
  description: string;

  @ApiProperty({
    type: String,
    description: 'Tipo do benefício',
    required: true,
  })
  type: string;
}
