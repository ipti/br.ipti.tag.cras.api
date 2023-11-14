import { ApiProperty } from '@nestjs/swagger';
import { BenefitsForFamily } from '../../../utils/types';
import { Kinship } from '@prisma/client';

export class AttendanceUnityAndAddress {
  @ApiProperty()
  address: string;

  @ApiProperty()
  telephone: string;

  @ApiProperty()
  reference: string;

  @ApiProperty()
  conditions: string;

  @ApiProperty()
  construction_type: string;

  @ApiProperty()
  rooms: number;

  @ApiProperty()
  rent_value: number;

  @ApiProperty()
  name: string;
}
