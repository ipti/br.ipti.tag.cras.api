import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Request } from 'express';
import { Role, user } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { optionalKeyValidation } from 'src/utils/optionalKeysValidation';

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

    if (request.user === undefined && createUser.edcenso_city === undefined) {
      throw new HttpException(
        'VOCÊ DEVE COLOCAR O ID DA CIDADE NO CORPO SE NÃO ESTIVER LOGADO COMO SECRETÁRIO',
        HttpStatus.FORBIDDEN,
      );
    }

    var edcenso_city: number;

    try {
      if (request.user.role === Role.SECRETARY) {
        edcenso_city = request.user.edcenso_city_fk;
      } else {
        edcenso_city = createUser.edcenso_city;
      }
    } catch (error) {
      edcenso_city = createUser.edcenso_city;
    }

    const cryptoPassword = this.encryptedMd5Password(createUser.password);

    const createdUser = await this.prismaService.user.create({
      data: {
        ...createUser,
        password: cryptoPassword,
        edcenso_city: {
          connect: {
            id: edcenso_city,
          },
        },
      },
    });

    delete createdUser.password;

    return createdUser;
  }

  async findAll(request: Request): Promise<user[]> {
    const allUser = await this.prismaService.user.findMany({
      where: {
        edcenso_city_fk: request.user.edcenso_city_fk,
      },
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
        edcenso_city_fk: request.user.edcenso_city_fk,
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

    const cityOptional = optionalKeyValidation(request.user.edcenso_city_fk, {
      connect: {
        id: request.user.edcenso_city_fk,
      },
    });

    const userUpdated = await this.prismaService.user.update({
      where: { id: +id, edcenso_city_fk: request.user.edcenso_city_fk },
      data: { ...UpdateUserDto, edcenso_city: cityOptional },
    });

    return userUpdated;
  }

  async remove(request: Request, id: string) {
    await this.findOne(request, id);

    const userDeleted = await this.prismaService.user.delete({
      where: { id: +id, edcenso_city_fk: request.user.edcenso_city_fk },
    });

    return userDeleted;
  }

  private encryptedMd5Password(password: string) {
    return crypto.createHash('md5').update(password).digest('hex');
  }
}
