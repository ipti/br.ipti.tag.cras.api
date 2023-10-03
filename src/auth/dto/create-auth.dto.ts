import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    description: "User's username",
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5, {
    message: 'Senha muito curta',
  })
  @ApiProperty({
    minLength: 8,

    required: true,
    description: "User's password",
  })
  password: string;
}
