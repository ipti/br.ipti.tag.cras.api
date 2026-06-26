import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Request } from 'express';
import { user } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(request: Request, createUser: CreateUserDto): Promise<user> {
    const userRegistered = await this.prismaService.user.findUnique({
      where: {
        username: createUser.username,
      },
    });

    if (userRegistered) {
      throw new HttpException(
        'O nome de usuário já existe, tente utilizar outro',
        HttpStatus.BAD_REQUEST,
      );
    }

    const cryptoPassword = this.encryptedMd5Password(createUser.password);

    const { edcenso_city: _city, ...userDataWithoutCity } = createUser as any;

    const createdUser = await this.prismaService.user.create({
      data: {
        ...userDataWithoutCity,
        password: cryptoPassword,
      },
    });

    delete createdUser.password;

    return createdUser;
  }

  async findAll(request: Request): Promise<user[]> {
    const allUser = await this.prismaService.user.findMany({
      orderBy: {
        id: 'desc',
      },
    });

    return allUser;
  }

  async findOne(request: Request, id: string): Promise<user> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: +id,
      },
    });

    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async update(request: Request, id: string, UpdateUserDto: UpdateUserDto) {
    await this.findOne(request, id);

    if (UpdateUserDto.password) {
      UpdateUserDto.password = this.encryptedMd5Password(
        UpdateUserDto.password,
      );
    }

    const userUpdated = await this.prismaService.user.update({
      where: { id: +id },
      data: { ...UpdateUserDto },
    });

    return userUpdated;
  }

  async remove(request: Request, id: string) {
    await this.findOne(request, id);

    const userDeleted = await this.prismaService.user.delete({
      where: { id: +id },
    });

    return userDeleted;
  }

  private encryptedMd5Password(password: string) {
    return crypto.createHash('md5').update(password).digest('hex');
  }
}
