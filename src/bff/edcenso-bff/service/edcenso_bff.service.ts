import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { Kinship, edcenso_city } from '@prisma/client';
import { optionalKeyValidation } from 'src/utils/optionalKeysValidation';

@Injectable()
export class EdcensoBffService {
  constructor(private readonly prismaService: PrismaService) { }

  async getEdcensoCity(request: Request): Promise<edcenso_city> {
    const edcensoCity = await this.prismaService.edcenso_city.findUnique({
      where: {
        id: request.user.edcenso_city_fk,
      },
      include: {
        edcenso_uf: true,
      },
    });

    if (!edcensoCity) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Cidade não encontrada',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return edcensoCity;
  }

  async getEdcensoCityById(edcenso_city_fk: string): Promise<edcenso_city> {
    const edcensoCity = await this.prismaService.edcenso_city.findUnique({
      where: {
        id: parseInt(edcenso_city_fk),
      },
      include: {
        edcenso_uf: true,
      },
    });

    if (!edcensoCity) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Cidade não encontrada',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return edcensoCity;
  }
}
