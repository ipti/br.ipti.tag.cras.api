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

    var attendance_unity_fk = null;

    const isTechnician = await this.prismaService.technician.findUnique({
      where: { user_fk: userFound.id },
    });

    if (isTechnician) {
      attendance_unity_fk = isTechnician.attendance_unity_fk;
    } else if (userFound.role !== Role.ADMIN) {
      const attendance_unity =
        await this.prismaService.attendance_unity.findFirst({
          where: { edcenso_city_fk: userFound.edcenso_city_fk },
        });

      if (attendance_unity) {
        attendance_unity_fk = attendance_unity.id;
      }
    }

    if (!isTechnician && userFound.role === Role.TECHNICIAN) {
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

    const { name, username, id, role, edcenso_city_fk } = userFound;

    return {
      name,
      username,
      id,
      role,
      edcenso_city_fk,
      attendance_unity_fk: attendance_unity_fk,
    };
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.id,
      role: user.role,
      edcenso_city_fk: user.edcenso_city_fk,
      attendance_unity_fk: user.attendance_unity_fk,
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
