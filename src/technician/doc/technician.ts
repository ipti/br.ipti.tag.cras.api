import { ApiProperty } from '@nestjs/swagger';

export class TechnicianDocument {
  @ApiProperty({
    type: String,
    description: 'Nome do técnico',
    required: true,
  })
  name: string;

  @ApiProperty({
    type: Number,
    description: 'Identificador do usuário',
    required: false,
  })
  user: number;

  @ApiProperty({
    type: Number,
    description: 'Unidade do técnico',
    required: true,
  })
  attendance_unity: number;
}
