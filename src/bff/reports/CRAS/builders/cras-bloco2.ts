import { PrismaService } from 'src/prisma/prisma.service';

export class CrasBloco2 {
  attendanceTotal: number;
  familyForwardCadUnicoAdd: number;
  familyForwardCadUnicoUpdate: number;
  userIdentifyForwardBPC: number;
  familyForwardCREAS: number;
  visitsTotal: number;
  bornBenefitsTotal: number;
  deathBenefitsTotal: number;
  otherBenefitsTotal: number;

  constructor(init?: Partial<CrasBloco2>) {
    Object.assign(this, init);
  }
}

export class CrasBloco2Builder {
  private bloco2: CrasBloco2;
  private attendance_unity: number;
  private month: number;
  private year: number;

  constructor(
    private readonly prisma: PrismaService,
    attendance_unity: number,
    month: number,
    year: number,
  ) {
    this.bloco2 = new CrasBloco2();
    this.attendance_unity = attendance_unity;
    this.month = month;
    this.year = year;
  }

  public async withAttendanceTotal(): Promise<CrasBloco2Builder> {
    const count: number = await this.prisma.$queryRaw`
        SELECT COUNT(a.id) as count
        FROM attendance a
        INNER JOIN attendance_unity au ON au.id = a.attendance_unity_fk
        WHERE 
            a.user_identify_fk IS NOT NULL AND
            au.\`type\` = "CRAS" AND
            au.id = ${this.attendance_unity} AND
            MONTH(a.\`date\`) = ${this.month} AND 
            YEAR(a.\`date\`) = ${this.year};
    `;

    this.bloco2.attendanceTotal = Number(count[0].count);
    return this;
  }

  public async withFamilyForwardCadUnicoAdd(): Promise<CrasBloco2Builder> {
    const count: number = await this.prisma.$queryRaw`
        SELECT COUNT(a.id) as count
        FROM family f
        INNER JOIN family_or_user_forwarding fouf ON fouf.family_fk  = f.id
        inner join attendance a on a.forwading_fk = fouf.id
        INNER JOIN forwading fw ON fw.id = fouf.forwading_fk 
        INNER JOIN attendance_unity au ON au.id = f.attendance_unity_fk
        WHERE fw.name = 'CadUnico' AND
            au.\`type\` = 'CRAS' AND
            fw.\`type\` = 'INCLUSAO' AND
            au.id = ${this.attendance_unity} AND
            MONTH(fouf.\`date\`) = ${this.month} AND 
            YEAR(fouf.\`date\`) = ${this.year}
    `;

    this.bloco2.familyForwardCadUnicoAdd = Number(count[0].count);
    return this;
  }

  public async withFamilyForwardCadUnicoUpdate(): Promise<CrasBloco2Builder> {
    const count: number = await this.prisma.$queryRaw`
        SELECT COUNT(f.id) as count
        FROM family f
        INNER JOIN family_or_user_forwarding fouf ON fouf.family_fk  = f.id
        INNER JOIN forwading fw ON fw.id = fouf.forwading_fk 
        INNER JOIN attendance_unity au ON au.id = f.attendance_unity_fk
        WHERE fw.name = 'CadUnico' AND
            au.\`type\` = 'CRAS' AND
            fw.\`type\` = 'ATUALIZACAO' AND
            au.id = ${this.attendance_unity} AND
            MONTH(fouf.\`date\`) = ${this.month} AND 
            YEAR(fouf.\`date\`) = ${this.year}
    `;

    this.bloco2.familyForwardCadUnicoUpdate = Number(count[0].count);
    return this;
  }

  public async withUserIdentifyForwardBPC(): Promise<CrasBloco2Builder> {
    const count: number = await this.prisma.$queryRaw`
        SELECT COUNT(ui.id) as count
        FROM user_identify ui
        INNER JOIN family f ON f.id = ui.family_fk 
        INNER JOIN family_or_user_forwarding fouf ON fouf.family_fk  = f.id
        INNER JOIN forwading fw ON fw.id = fouf.forwading_fk 
        INNER JOIN attendance_unity au ON au.id = f.attendance_unity_fk
        WHERE fw.name = 'BPC' AND
            au.\`type\` = 'CRAS' AND
            fw.\`type\` = 'ACESSO' AND
            au.id = ${this.attendance_unity} AND
            MONTH(fouf.\`date\`) = ${this.month} AND 
            YEAR(fouf.\`date\`) = ${this.year}
    `;

    this.bloco2.userIdentifyForwardBPC = Number(count[0].count);
    return this;
  }

  public async withFamilyForwardCREAS(): Promise<CrasBloco2Builder> {
    const count: number = await this.prisma.$queryRaw`
        SELECT COUNT(f.id) as count
        FROM family f
        INNER JOIN family_or_user_forwarding fouf ON fouf.family_fk  = f.id
        INNER JOIN forwading fw ON fw.id = fouf.forwading_fk 
        INNER JOIN attendance_unity au ON au.id = f.attendance_unity_fk
        WHERE fw.name = 'CREAS' AND
            au.\`type\` = 'CRAS' AND
            fw.\`type\` = 'ENCAMINHAMENTO' AND
            au.id = ${this.attendance_unity} AND
            MONTH(fouf.\`date\`) = ${this.month} AND 
            YEAR(fouf.\`date\`) = ${this.year}
    `;

    this.bloco2.familyForwardCREAS = Number(count[0].count);
    return this;
  }

  public async withVisitsTotal(): Promise<CrasBloco2Builder> {
    const count: number = await this.prisma.$queryRaw`
        SELECT COUNT(tv.id) as count
        FROM technician_visits tv
        INNER JOIN attendance_unity au ON au.id = tv.attendance_unity_fk 
        WHERE 
            au.\`type\` = 'CRAS' AND
            au.id = ${this.attendance_unity} AND
            MONTH(tv.created_at) = ${this.month} AND 
            YEAR(tv.created_at) = ${this.year}
    `;

    this.bloco2.visitsTotal = Number(count[0].count);
    return this;
  }

  public async withBornBenefitsTotal(): Promise<CrasBloco2Builder> {
    const count: number = await this.prisma.$queryRaw`
        SELECT COUNT(f.id) as count
        FROM family f
        INNER JOIN attendance_unity au ON au.id = f.attendance_unity_fk
        INNER JOIN family_benefits fb ON fb.id = f.id 
        INNER JOIN benefits b ON b.id = fb.benefits_fk 
        WHERE 
            b.description = 'Auxilio-Natalidade' AND
            b.canDelete = false AND
            au.\`type\` = 'CRAS' AND
            au.id = ${this.attendance_unity} AND
            MONTH(fb.\`date\`) = ${this.month} AND 
            YEAR(fb.\`date\`) = ${this.year}
    `;

    this.bloco2.bornBenefitsTotal = Number(count[0].count);
    return this;
  }

  public async withDeathBenefitsTotal(): Promise<CrasBloco2Builder> {
    const count: number = await this.prisma.$queryRaw`
        SELECT COUNT(f.id) as count
        FROM family f
        INNER JOIN attendance_unity au ON au.id = f.attendance_unity_fk
        INNER JOIN family_benefits fb ON fb.id = f.id 
        INNER JOIN benefits b ON b.id = fb.benefits_fk 
        WHERE 
            b.description = 'Auxilio-Funeral' AND
            b.canDelete = false AND
            au.\`type\` = 'CRAS' AND
            au.id = ${this.attendance_unity} AND
            MONTH(fb.\`date\`) = ${this.month} AND 
            YEAR(fb.\`date\`) = ${this.year}
    `;

    this.bloco2.deathBenefitsTotal = Number(count[0].count);
    return this;
  }

  public async withOtherBenefitsTotal(): Promise<CrasBloco2Builder> {
    const count: number = await this.prisma.$queryRaw`
        SELECT COUNT(f.id) as count
        FROM family f
        INNER JOIN attendance_unity au ON au.id = f.attendance_unity_fk
        INNER JOIN family_benefits fb ON fb.id = f.id 
        INNER JOIN benefits b ON b.id = fb.benefits_fk 
        WHERE 
            b.description != 'Auxilio-Natalidade' AND
            b.description != 'Auxilio-Funeral' AND
            b.\`type\` = 'EVENTUAL' AND
            au.\`type\` = 'CRAS' AND
            au.id = ${this.attendance_unity} AND
            MONTH(fb.\`date\`) = ${this.month} AND 
            YEAR(fb.\`date\`) = ${this.year}
    `;

    this.bloco2.otherBenefitsTotal = Number(count[0].count);
    return this;
  }

  public build(): CrasBloco2 {
    return this.bloco2;
  }
}
