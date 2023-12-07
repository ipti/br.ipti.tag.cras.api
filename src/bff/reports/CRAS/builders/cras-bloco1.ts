import { PrismaService } from 'src/prisma/prisma.service';

export class CRASBloco1 {
  familyTotal: number;
  familyMonthy: number;
  familyLowIncome: number;
  familyBolsaFamilia: number;
  familyBolsaFamiliaBreakCondicionalities: number;
  familyMembersWithBPC: number;
  familyChildWork: number;
  familyChildShelterProtection: number;

  constructor(init?: Partial<CRASBloco1>) {
    Object.assign(this, init);
  }
}

export class CRASBloco1Builder {
  private bloco1: CRASBloco1;
  private attendance_unity: number;
  private month: number;
  private year: number;

  constructor(
    private readonly prisma: PrismaService,
    attendance_unity: number,
    month: number,
    year: number,
  ) {
    this.bloco1 = new CRASBloco1();
    this.attendance_unity = attendance_unity;
    this.month = month;
    this.year = year;
  }

  public async withFamilyTotal(): Promise<CRASBloco1Builder> {
    const count: number = await this.prisma.$queryRaw`
      SELECT COUNT(f.id) as count 
      FROM family f
      INNER JOIN attendance_unity au ON au.id = f.attendance_unity_fk
      INNER JOIN family_or_user_forwarding fouf ON fouf.family_fk = f.id
      INNER JOIN forwading f2 ON f2.id = fouf.forwading_fk 
      WHERE f2.name = 'PAIF' AND
      f2.canDelete = false AND
      au.id = ${this.attendance_unity}
      `;

    this.bloco1.familyTotal = Number(count[0].count);
    return this;
  }

  public async withFamilyMonthy(): Promise<CRASBloco1Builder> {
    const count: number = await this.prisma.$queryRaw`
      SELECT COUNT(f.id) as count 
      FROM family f
      INNER JOIN attendance_unity au ON au.id = f.attendance_unity_fk
      INNER JOIN family_or_user_forwarding fouf ON fouf.family_fk = f.id
      INNER JOIN forwading fw ON fw.id  = fouf.forwading_fk
      WHERE fw.name = 'PAIF' AND 
        au.id = ${this.attendance_unity} AND
        MONTH(fouf.\`date\`) = ${this.month} AND 
        YEAR(fouf.\`date\`) = ${this.year};
      `;

    this.bloco1.familyMonthy = Number(count[0].count);
    return this;
  }

  public async withFamilyLowIncome(): Promise<CRASBloco1Builder> {
    const count: number = await this.prisma.$queryRaw`
            SELECT COUNT(f.id) as count
            FROM family f
            INNER JOIN attendance_unity au ON au.id = f.attendance_unity_fk
            INNER JOIN family_or_user_forwarding fouf ON fouf.family_fk = f.id
            INNER JOIN forwading fw ON fw.id  = fouf.forwading_fk 
            INNER JOIN vulnerability v ON f.vulnerability_fk = v.id
            WHERE fw.name = 'PAIF' AND 
                v.low_income = true AND 
                au.id = ${this.attendance_unity} AND
                MONTH(fouf.\`date\`) = ${this.month} AND 
                YEAR(fouf.\`date\`) = ${this.year};
        `;

    this.bloco1.familyLowIncome = Number(count[0].count);
    return this;
  }

  public async withFamilyBolsaFamilia(): Promise<CRASBloco1Builder> {
    const count: number = await this.prisma.$queryRaw`
            SELECT COUNT(f.id) as count
            FROM family f
            INNER JOIN attendance_unity au ON au.id = f.attendance_unity_fk
            INNER JOIN family_or_user_forwarding fouf ON fouf.family_fk = f.id
            INNER JOIN forwading fw ON fw.id  = fouf.forwading_fk  
            INNER JOIN family_benefits fb ON f.id = fb.family_fk
            INNER JOIN benefits b ON fb.benefits_fk = b.id
            WHERE fw.name = 'PAIF' AND 
                au.id = ${this.attendance_unity} AND
                MONTH(fouf.\`date\`) = ${this.month} AND 
                YEAR(fouf.\`date\`) = ${this.year} AND
                b.description LIKE '%Bolsa Familia%';
        `;

    this.bloco1.familyBolsaFamilia = Number(count[0].count);
    return this;
  }

  public async withFamilyBolsaFamiliaBreakCondicionalities(): Promise<CRASBloco1Builder> {
    const count: number = await this.prisma.$queryRaw`
            SELECT COUNT(f.id) as count
            FROM family f
            INNER JOIN attendance_unity au ON au.id = f.attendance_unity_fk
            INNER JOIN family_benefits fb ON f.id = fb.family_fk
            INNER JOIN family_or_user_forwarding fouf ON fouf.family_fk = f.id
            INNER JOIN forwading fw ON fw.id  = fouf.forwading_fk 
            INNER JOIN benefits b ON fb.benefits_fk = b.id AND b.description = 'Bolsa Familia'
            INNER JOIN condicionalities c ON c.family_fk  = f.id
            WHERE fw.name = 'PAIF' AND 
                au.id = ${this.attendance_unity} AND
                MONTH(fouf.\`date\`) = ${this.month} AND 
                YEAR(fouf.\`date\`) = ${this.year} AND
                (
                    c.vaccination_schedule = false OR 
                    c.nutritional_status = false OR 
                    c.prenatal = false OR 
                    c.school_frequency = false
                );
        `;
    this.bloco1.familyBolsaFamiliaBreakCondicionalities = Number(
      count[0].count,
    );
    return this;
  }

  public async withFamilyMembersWithBPC(): Promise<CRASBloco1Builder> {
    const count: number = await this.prisma.$queryRaw`
            SELECT COUNT(f.id) as count
            FROM family f
            INNER JOIN attendance_unity au ON au.id = f.attendance_unity_fk
            INNER JOIN family_benefits fb ON fb.family_fk = f.id
            INNER JOIN family_or_user_forwarding fouf ON fouf.family_fk = f.id
            INNER JOIN forwading fw ON fw.id  = fouf.forwading_fk 
            INNER JOIN benefits b ON b.id = fb.benefits_fk 
            WHERE 
                fw.name = 'PAIF' AND 
                b.description = "BPC" AND 
                b.canDelete = false AND
                au.id = ${this.attendance_unity} AND
                MONTH(fouf.\`date\`) = ${this.month} AND 
                YEAR(fouf.\`date\`) = ${this.year}
        `;

    this.bloco1.familyMembersWithBPC = Number(count[0].count);
    return this;
  }

  public async withFamilyChildWork(): Promise<CRASBloco1Builder> {
    const count: number = await this.prisma.$queryRaw`
            SELECT COUNT(f.id) as count
            FROM family f
            INNER JOIN attendance_unity au ON au.id = f.attendance_unity_fk
            INNER JOIN family_or_user_forwarding fouf ON fouf.family_fk = f.id 
            INNER JOIN forwading fw ON fw.id = fouf.forwading_fk 
            INNER JOIN vulnerability v ON f.vulnerability_fk = v.id
            WHERE 
                fw.name = 'PAIF' AND 
                v.child_work = true AND
                au.id = ${this.attendance_unity} AND
                MONTH(fouf.\`date\`) = ${this.month} AND 
                YEAR(fouf.\`date\`) = ${this.year}
        `;

    this.bloco1.familyChildWork = Number(count[0].count);
    return this;
  }

  public async withFamilyChildShelterProtection(): Promise<CRASBloco1Builder> {
    const count: number = await this.prisma.$queryRaw`
            SELECT COUNT(f.id) as count
            FROM family f
            INNER JOIN attendance_unity au ON au.id = f.attendance_unity_fk
            INNER JOIN family_or_user_forwarding fouf ON fouf.family_fk = f.id
            INNER JOIN forwading fw ON fw.id  = fouf.forwading_fk 
            INNER JOIN vulnerability v ON f.vulnerability_fk = v.id
            WHERE 
                fw.name = 'PAIF' AND 
                v.child_shelter_protection = true AND
                au.id = ${this.attendance_unity} AND 
                MONTH(fouf.\`date\`) = ${this.month} AND 
                YEAR(fouf.\`date\`) = ${this.year}
        `;

    this.bloco1.familyChildShelterProtection = Number(count[0].count);

    return this;
  }

  public build(): CRASBloco1 {
    return this.bloco1;
  }
}
