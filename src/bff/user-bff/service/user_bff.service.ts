import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserBffDto } from '../dto/create-user_bff.dto';
import { UpdateUserBffDto } from '../dto/update-user_bff.dto';

@Injectable()
export class UserBffService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.user.findMany({
      orderBy: { id: 'desc' },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
        attendance_unities: {
          select: {
            attendance_unity_fk: true,
            attendance_unity: { select: { id: true, name: true } },
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        role: true,
        attendance_unities: {
          select: {
            attendance_unity_fk: true,
            attendance_unity: { select: { id: true, name: true } },
          },
        },
      },
    });

    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async create(dto: CreateUserBffDto) {
    const existing = await this.prismaService.user.findUnique({
      where: { username: dto.username },
    });

    if (existing) {
      throw new HttpException('Nome de usuário já existe', HttpStatus.CONFLICT);
    }

    const password = await bcrypt.hash(dto.password, 12);
    const { attendance_unity_ids = [], ...userData } = dto;

    return this.prismaService.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: { ...userData, password },
      });

      if (attendance_unity_ids.length > 0) {
        await tx.user_attendance_unity.createMany({
          data: attendance_unity_ids.map((unity_fk) => ({
            user_fk: user.id,
            attendance_unity_fk: unity_fk,
          })),
          skipDuplicates: true,
        });
      }

      return tx.user.findUnique({
        where: { id: user.id },
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          role: true,
          attendance_unities: {
            select: {
              attendance_unity_fk: true,
              attendance_unity: { select: { id: true, name: true } },
            },
          },
        },
      });
    });
  }

  async update(id: string, dto: UpdateUserBffDto) {
    const user = await this.prismaService.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    const { attendance_unity_ids, password, ...userData } = dto;

    const data: any = { ...userData };
    if (password) {
      data.password = await bcrypt.hash(password, 12);
    }

    return this.prismaService.$transaction(async (tx) => {
      await tx.user.update({ where: { id: parseInt(id) }, data });

      if (attendance_unity_ids !== undefined) {
        await tx.user_attendance_unity.deleteMany({ where: { user_fk: parseInt(id) } });

        if (attendance_unity_ids.length > 0) {
          await tx.user_attendance_unity.createMany({
            data: attendance_unity_ids.map((unity_fk) => ({
              user_fk: parseInt(id),
              attendance_unity_fk: unity_fk,
            })),
            skipDuplicates: true,
          });
        }
      }

      return tx.user.findUnique({
        where: { id: parseInt(id) },
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          role: true,
          attendance_unities: {
            select: {
              attendance_unity_fk: true,
              attendance_unity: { select: { id: true, name: true } },
            },
          },
        },
      });
    });
  }
}
