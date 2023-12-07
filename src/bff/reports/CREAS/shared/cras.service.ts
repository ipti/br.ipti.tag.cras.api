import { PrismaService } from 'src/prisma/prisma.service';
import { CRASRMABuilder } from '../builders/cras';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class CRASRMAService {
  constructor(private readonly prisma: PrismaService) {}

  public async getCRASRMA(month: number, year: number) {
    const crasRMA = await new CRASRMABuilder(this.prisma, month, year)
      .buildCRASBloco1()
      .then((builder) => builder.build())
    return crasRMA;
  }
}
