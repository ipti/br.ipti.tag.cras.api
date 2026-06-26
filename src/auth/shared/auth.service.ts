import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
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

    if (!userFound) {
      throw new HttpException(
        'USER OR PASSWORD IS INCORRECT!',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const userUnities = await this.prismaService.user_attendance_unity.findMany({
      where: { user_fk: userFound.id },
      select: { attendance_unity_fk: true },
    });

    const attendance_unity_ids = userUnities.map((u) => u.attendance_unity_fk);

    if (userFound.role === Role.TECHNICIAN && attendance_unity_ids.length === 0) {
      throw new HttpException(
        'USER NOT ASSIGNED TO ANY ATTENDANCE UNITY!',
        HttpStatus.FORBIDDEN,
      );
    }

    const passwordValid = await this.verifyPassword(
      userPassword,
      userFound.password,
      userFound.id,
    );

    if (!passwordValid) return null;

    const { name, username, id, role } = userFound;

    return {
      name,
      username,
      id,
      role,
      attendance_unity_ids,
    };
  }

  async login(user: any) {
    const payload = {
      name: user.name,
      username: user.username,
      sub: user.id,
      role: user.role,
      attendance_unity_ids: user.attendance_unity_ids,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  private async verifyPassword(
    plain: string,
    stored: string,
    userId: number,
  ): Promise<boolean> {
    const isBcrypt = stored.startsWith('$2');

    if (isBcrypt) {
      return bcrypt.compare(plain, stored);
    }

    // Senha ainda em MD5 — verifica e migra para bcrypt
    const md5Hash = crypto.createHash('md5').update(plain).digest('hex');
    if (md5Hash !== stored) return false;

    const newHash = await bcrypt.hash(plain, 12);
    await this.prismaService.user.update({
      where: { id: userId },
      data: { password: newHash },
    });

    return true;
  }
}
