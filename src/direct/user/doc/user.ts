import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class UserDocument {
  @ApiProperty({
    type: String,
    description: 'Nome do usuário',
    required: true,
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Nome de usuário',
    required: true,
  })
  username: string;

  @ApiProperty({
    type: String,
    description: 'E-mail do usuário',
    required: true,
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'Senha do usuário',
    required: true,
  })
  password: string;

  @ApiProperty({
    type: String,
    description: 'Função do usuário',
    required: true,
  })
  role: Role;

  @ApiProperty({
    type: Number,
    description: 'Identificador da cidade do usuário',
    required: false,
  })
  edcenso_city: number;
}
