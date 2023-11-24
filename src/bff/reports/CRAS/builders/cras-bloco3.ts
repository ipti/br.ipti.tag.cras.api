import { PrismaService } from 'src/prisma/prisma.service';

export class CrasBloco3 {
  familyGroupsPAIF: number;
  childStrengtheningServices: number;
  childTeenStrengtheningServices: number;
  teenStrengtheningServices: number;
  adultStrengtheningServices: number;
  elderlyStrengtheningServices: number;
  peopleOtherCollectiveActivities: number;
  peopleWithDeficiencyStrengtheningServicesOrGroupsPAIF: number;

  constructor(init?: Partial<CrasBloco3>) {
    Object.assign(this, init);
  }
}

export class CrasBloco3Builder {
  private bloco3: CrasBloco3;
  private month: number;
  private year: number;

  constructor(
    private readonly prisma: PrismaService,
    month: number,
    year: number,
  ) {
    this.bloco3 = new CrasBloco3();
    this.month = month;
    this.year = year;
  }

  public async withFamilyGroupsPAIF(): Promise<CrasBloco3Builder> {
    const count: number = await this.prisma.$queryRaw`
        SELECT COUNT(f.id) as count
        FROM family f
        INNER JOIN group_attendance ga ON ga.family_fk = f.id
        INNER JOIN attendance a ON a.id = ga.attendance_fk 
        INNER JOIN attendance_unity au ON au.id = f.attendance_unity_fk
        INNER JOIN task t ON t.id = a.task_fk
        WHERE 
            au.\`type\` = 'CRAS' AND
            a.user_identify_fk = NULL AND
            t.name = 'Grupo desenvolvido pelo PAIF' AND
            t.canDelete = false AND
            t.isCollective = true AND
            MONTH(ga.\`date\`) = ${this.month} AND 
            YEAR(ga.\`date\`) = ${this.year};
    `;

    this.bloco3.familyGroupsPAIF = Number(count[0].count);
    return this;
  }

  public async withChildStrengtheningServices(): Promise<CrasBloco3Builder> {
    const count: number = await this.prisma.$queryRaw`
        SELECT COUNT(ui.id)
        FROM user_identify ui
        INNER JOIN family f ON f.id = ui.family_fk 
        INNER JOIN attendance a ON a.user_identify_fk = ui.id 
        INNER JOIN attendance_unity au ON au.id = f.attendance_unity_fk 
        INNER JOIN task t ON t.id = a.task_fk
        WHERE 
            au.\`type\` = 'CRAS' AND
            a.user_identify_fk != NULL AND
            0 < TIMESTAMPDIFF(YEAR, ui.birthday, CURDATE()) AND TIMESTAMPDIFF(YEAR, ui.birthday, CURDATE()) > 6 AND
            t.name = 'Serviço de Convivência e Fortalecimento de Vínculos' AND
            t.canDelete = false AND
            t.isCollective = true AND
            MONTH(a.\`date\`) = ${this.month} AND 
            YEAR(a.\`date\`) = ${this.year};
    `;

    this.bloco3.childStrengtheningServices = Number(count[0].count);
    return this;
  }
}
