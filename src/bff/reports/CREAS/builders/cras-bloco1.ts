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
  private month: number;
  private year: number;

  constructor(
    private readonly prisma: PrismaService,
    month: number,
    year: number,
  ) {
    this.bloco1 = new CRASBloco1();
    this.month = month;
    this.year = year;
  }

  public async withFamilyTotal(): Promise<CRASBloco1Builder> {
    const count: number = await this.prisma.$queryRaw`
            SELECT COUNT(f.id) as count 
            FROM family f
            JOIN forwarding f2 ON f2.family_fk = f.id 
            WHERE f2.isPAIF = true
        `;

    this.bloco1.familyTotal = Number(count[0].count);
    return this;
  }

  public async withFamilyMonthy(): Promise<CRASBloco1Builder> {
    const count: number = await this.prisma.$queryRaw`
            SELECT COUNT(f.id) as count 
            FROM family f
            INNER JOIN forwarding fw ON f.id = fw.family_fk
            WHERE fw.isPAIF = true AND 
                MONTH(fw.datePAIF) = ${this.month} AND 
                YEAR(fw.datePAIF) = ${this.year};
        `;

    this.bloco1.familyMonthy = Number(count[0].count);
    return this;
  }

  public async withFamilyLowIncome(): Promise<CRASBloco1Builder> {
    const count: number = await this.prisma.$queryRaw`
            SELECT COUNT(f.id) as count
            FROM family f
            INNER JOIN forwarding fw ON f.id = fw.family_fk
            INNER JOIN vulnerability v ON f.vulnerability_fk = v.id
            WHERE fw.isPAIF = true AND 
                v.low_income = true AND 
                MONTH(fw.datePAIF) = ${this.month} AND 
                YEAR(fw.datePAIF) = ${this.year};
        `;

    this.bloco1.familyLowIncome = Number(count[0].count);
    return this;
  }

  public async withFamilyBolsaFamilia(): Promise<CRASBloco1Builder> {
    const count: number = await this.prisma.$queryRaw`
            SELECT COUNT(f.id) as count
            FROM family f
            INNER JOIN forwarding fw ON f.id = fw.family_fk
            INNER JOIN family_benefits fb ON f.id = fb.family_fk
            INNER JOIN benefits b ON fb.benefits_fk = b.id
            WHERE fw.isPAIF = true AND 
                MONTH(fw.datePAIF) = ${this.month} AND 
                YEAR(fw.datePAIF) = ${this.year} AND
                b.description LIKE '%Bolsa Família%';
        `;

    this.bloco1.familyBolsaFamilia = Number(count[0].count);
    return this;
  }

  public async withFamilyBolsaFamiliaBreakCondicionalities(): Promise<CRASBloco1Builder> {
    const count: number = await this.prisma.$queryRaw`
            SELECT COUNT(f.id) as count
            FROM family f
            INNER JOIN forwarding fw ON f.id = fw.family_fk
            INNER JOIN family_benefits fb ON f.id = fb.family_fk
            INNER JOIN benefits b ON fb.benefits_fk = b.id AND b.description = 'Bolsa Família'
            INNER JOIN condicionalities c ON f.condicionalities_fk = c.id
            WHERE fw.isPAIF = true AND 
                MONTH(fw.datePAIF) = 5 AND 
                YEAR(fw.datePAIF) = 2023 AND
                (
                    c.vaccination_schedule = false OR 
                    c.nutritional_status = false OR 
                    c.prenatal = false OR 
                    c.school_frequency = false
                );
        `;
    this.bloco1.familyBolsaFamiliaBreakCondicionalities = Number(count[0].count);
    return this;
  }

  public async withFamilyMembersWithBPC(): Promise<CRASBloco1Builder> {
    const count: number = await this.prisma.$queryRaw`
            SELECT COUNT(f.id) as count
            FROM family f
            INNER JOIN forwarding fw ON f.id = fw.family_fk
            INNER JOIN user_identify ui ON f.id = ui.family_fk
            WHERE 
                fw.isPAIF = true AND 
                ui.bpc = true AND 
                MONTH(fw.datePAIF) = ${this.month} AND 
                YEAR(fw.datePAIF) = ${this.year}
        `;

    this.bloco1.familyMembersWithBPC = Number(count[0].count);
    return this;
  }

  public async withFamilyChildWork(): Promise<CRASBloco1Builder> {
    const count: number = await this.prisma.$queryRaw`
            SELECT COUNT(f.id) as count
            FROM family f
            INNER JOIN forwarding fw ON f.id = fw.family_fk
            INNER JOIN vulnerability v ON f.vulnerability_fk = v.id
            WHERE 
                fw.isPAIF = true AND 
                v.child_work = true AND
                MONTH(fw.datePAIF) = ${this.month} AND 
                YEAR(fw.datePAIF) = ${this.year}
        `;

    this.bloco1.familyChildWork = Number(count[0].count);
    return this;
  }

  public async withFamilyChildShelterProtection(): Promise<CRASBloco1Builder> {
    const count: number = await this.prisma.$queryRaw`
            SELECT COUNT(f.id) as count
            FROM family f
            INNER JOIN forwarding fw ON f.id = fw.family_fk
            INNER JOIN vulnerability v ON f.vulnerability_fk = v.id
            WHERE 
                fw.isPAIF = true AND 
                v.child_shelter_protection = true AND 
                MONTH(fw.datePAIF) = ${this.month} AND 
                YEAR(fw.datePAIF) = ${this.year}
        `;

    this.bloco1.familyChildShelterProtection = Number(count[0].count);

    return this;
  }

  public build(): CRASBloco1 {
    return this.bloco1;
  }
}
