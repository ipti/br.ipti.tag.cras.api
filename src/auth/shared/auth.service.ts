import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async validateUser(userUsername: string, userPassword: string) {

    const userFound = await this.prismaService.user.findUnique({
      where: { username: userUsername },
    });

    if(!userFound){
      throw new HttpException(
        'USER OR PASSWORD IS INCORRECT!',
        HttpStatus.UNAUTHORIZED,
      );
    };

    if (
      userFound && this.validateMd5Password(userPassword, userFound.password)
    ) {
      const { name, username, id, role, edcenso_city_fk } = userFound;

      return { name, username, id, role, edcenso_city_fk  };
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role, edcenso_city_fk: user.edcenso_city_fk };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  private validateMd5Password(password: string, encryptedPassword: string) {
    const currentEncryptedPassword = this.encryptedMd5Password(password);
    if (currentEncryptedPassword === encryptedPassword) {
      return true;
    }
    return false;
  }

  private encryptedMd5Password(password: string) {
    return crypto.createHash('md5').update(password).digest('hex');
  }
}
