import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddressDocument {
  @ApiProperty({
    description: 'Address',
    example: 'Rua 1',
  })
  address: string;

  @ApiProperty({
    description: 'Telephone',
    example: '123456789',
  })
  telephone: string;

  @ApiProperty({
    description: 'Reference',
    example: 'Perto do mercado',
  })
  reference: string;

  @ApiProperty({
    description: 'Conditions',
    example: 'Bom',
  })
  conditions: string;

  @ApiProperty({
    description: 'Construction type',
    example: 'Alvenaria',
  })
  construction_type: string;

  @ApiProperty({
    description: 'Rooms',
    example: '2',
  })
  rooms: string;

  @ApiProperty({
    description: 'Rent value',
    example: '500',
  })
  rent_value: number;
}
