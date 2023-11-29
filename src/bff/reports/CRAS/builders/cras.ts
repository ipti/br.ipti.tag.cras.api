import { PrismaService } from 'src/prisma/prisma.service';
import { CRASBloco1, CRASBloco1Builder } from './cras-bloco1';
import { CrasBloco2, CrasBloco2Builder } from './cras-bloco2';
import { CrasBloco3, CrasBloco3Builder } from './cras-bloco3';

export class CRASRMA {
  bloco1: CRASBloco1;
  bloco2: CrasBloco2;
  bloco3: CrasBloco3;

  constructor(init?: Partial<CRASRMA>) {
    Object.assign(this, init);
  }
}

export class CRASRMABuilder {
  private crasRMA: CRASRMA;
  private attendance_unity: number;
  private month: number;
  private year: number;

  constructor(
    private readonly prisma: PrismaService,
    attendance_unity: number,
    month: number,
    year: number,
  ) {
    this.crasRMA = new CRASRMA();
    this.attendance_unity = attendance_unity;
    this.month = month;
    this.year = year;
  }

  public async buildCRASBloco1(): Promise<CRASRMABuilder> {
    const crasBloco1 = await new CRASBloco1Builder(
      this.prisma,
      this.attendance_unity,
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
      .then((builder) => builder.build());
    this.crasRMA.bloco1 = crasBloco1;
    return this;
  }

  public async buildCRASBloco2(): Promise<CRASRMABuilder> {
    const crasBloco2 = await new CrasBloco2Builder(
      this.prisma,
      this.attendance_unity,
      this.month,
      this.year,
    )
      .withAttendanceTotal()
      .then((builder) => builder.withFamilyForwardCadUnicoAdd())
      .then((builder) => builder.withFamilyForwardCadUnicoUpdate())
      .then((builder) => builder.withUserIdentifyForwardBPC())
      .then((builder) => builder.withFamilyForwardCREAS())
      .then((builder) => builder.withVisitsTotal())
      .then((builder) => builder.withBornBenefitsTotal())
      .then((builder) => builder.withDeathBenefitsTotal())
      .then((builder) => builder.withOtherBenefitsTotal())
      .then((builder) => builder.build());
    this.crasRMA.bloco2 = crasBloco2;
    return this;
  }

  public async buildCRASBloco3(): Promise<CRASRMABuilder> {
    const crasBloco3 = await new CrasBloco3Builder(
      this.prisma,
      this.attendance_unity,
      this.month,
      this.year,
    )
      .withFamilyGroupsPAIF()
      .then((builder) => builder.withChildStrengtheningServices())
      .then((builder) => builder.withChildTeenStrengtheningServices())
      .then((builder) => builder.withTeenStrengtheningServices())
      .then((builder) => builder.withAdultStrengtheningServices())
      .then((builder) => builder.withElderlyStrengtheningServices())
      .then((builder) => builder.withPeopleOtherCollectiveActivities())
      .then((builder) =>
        builder.withPeopleWithDeficiencyStrengtheningServicesOrGroupsPAIF(),
      )
      .then((builder) => builder.build());
    return this;
  }

  public build(): CRASRMA {
    return this.crasRMA;
  }
}
