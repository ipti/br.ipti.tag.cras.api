import { ApiProperty } from '@nestjs/swagger';

export class AttendanceDocument {
  @ApiProperty({
    type: Number,
    description: 'Identificador do usuário',
    required: true,
  })
  user_identify_fk: number;

  @ApiProperty({
    type: Number,
    description: 'Identificador do técnico',
    required: true,
  })
  technician_fk: number;

  @ApiProperty({
    type: Number,
    description: 'Serviço',
    required: true,
  })
  task_fk: number;

  @ApiProperty({
    type: Number,
    description: 'Identificador da unidade',
    required: true,
  })
  attendance_unity_fk: number;

  @ApiProperty({
    type: String,
    description: 'Solicitação',
    required: true,
  })
  solicitation: string;

  @ApiProperty({
    type: String,
    description: 'Providência',
    required: true,
  })
  providence: string;

  @ApiProperty({
    type: String,
    description: 'Resultado',
    required: true,
  })
  result: string;

  @ApiProperty({
    type: String,
    description: 'Descrição',
    required: true,
  })
  description: string;
}
