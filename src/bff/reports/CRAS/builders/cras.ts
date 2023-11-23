import { PrismaService } from 'src/prisma/prisma.service';
import { CRASBloco1, CRASBloco1Builder } from './cras-bloco1';

export class CRASRMA {
  bloco1: CRASBloco1;

  constructor(init?: Partial<CRASRMA>) {
    Object.assign(this, init);
  }
}

export class CRASRMABuilder {
  private crasRMA: CRASRMA;
  private month: number;
  private year: number;

  constructor(
    private readonly prisma: PrismaService,
    month: number,
    year: number,
  ) {
    this.crasRMA = new CRASRMA();
    this.month = month;
    this.year = year;
  }

  public async buildCRASBloco1(): Promise<CRASRMABuilder> {
    const crasBloco1 = await new CRASBloco1Builder(
      this.prisma,
      this.month,
      this.year,
    )
      .withFamilyTotal()
      .then((builder) => builder.withFamilyMonthy())
      .then((builder) => builder.withFamilyLowIncome())
      .then((builder) => builder.withFamilyBolsaFamilia())
      .then((builder) => builder.withFamilyBolsaFamiliaBreakCondicionalities())
      .then((builder) => builder.withFamilyMembersWithBPC())
      .then((builder) => builder.withFamilyChildWork())
      .then((builder) => builder.withFamilyChildShelterProtection())
      .then((builder) => builder.build())
    this.crasRMA.bloco1 = crasBloco1;
    return this;
  }

  public build(): CRASRMA {
    return this.crasRMA;
  }
}
