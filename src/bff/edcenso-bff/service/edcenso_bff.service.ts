import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { edcenso_city } from '@prisma/client';

@Injectable()
export class EdcensoBffService {
  constructor(private readonly prismaService: PrismaService) { }

  async getEdcensoCityById(edcenso_city_fk: string): Promise<edcenso_city> {
    const edcensoCity = await this.prismaService.edcenso_city.findUnique({
      where: { id: parseInt(edcenso_city_fk) },
      include: { edcenso_uf: true },
    });

    if (!edcensoCity) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Cidade não encontrada' },
        HttpStatus.NOT_FOUND,
      );
    }

    return edcensoCity;
  }

  async getAllUf() {
    return this.prismaService.edcenso_uf.findMany({
      orderBy: { acronym: 'asc' },
    });
  }

  async getCitiesByUf(uf_fk: string) {
    return this.prismaService.edcenso_city.findMany({
      where: { edcenso_uf_fk: parseInt(uf_fk) },
      select: { id: true, name: true },
      orderBy: { name: 'asc' },
    });
  }
}
