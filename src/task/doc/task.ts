import { ApiProperty } from '@nestjs/swagger';

export class TaskDocument {
  @ApiProperty({
    type: String,
    description: 'Nome da tarefa',
    required: true,
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Descrição da tarefa',
    required: false,
  })
  description: string;
}
