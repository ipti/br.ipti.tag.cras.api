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
  private attendance_unity: number;
  private month: number;
  private year: number;

  constructor(
    private readonly prisma: PrismaService,
    attendance_unity: number,
    month: number,
    year: number,
  ) {
    this.bloco3 = new CrasBloco3();
    this.attendance_unity = attendance_unity;
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
            au.id = ${this.attendance_unity} AND
            MONTH(ga.\`date\`) = ${this.month} AND 
            YEAR(ga.\`date\`) = ${this.year};
    `;

    this.bloco3.familyGroupsPAIF = Number(count[0].count);
    return this;
  }

  public async withChildStrengtheningServices(): Promise<CrasBloco3Builder> {
    const count: number = await this.prisma.$queryRaw`
        SELECT COUNT(ui.id) as count
        FROM user_identify ui
        INNER JOIN family f ON f.id = ui.family_fk 
        INNER JOIN attendance a ON a.user_identify_fk = ui.id 
        INNER JOIN attendance_unity au ON au.id = f.attendance_unity_fk 
        INNER JOIN task t ON t.id = a.task_fk
        WHERE 
            au.\`type\` = 'CRAS' AND
            a.user_identify_fk != NULL AND
            0 < TIMESTAMPDIFF(YEAR, ui.birthday, CURDATE()) AND TIMESTAMPDIFF(YEAR, ui.birthday, CURDATE()) >= 6 AND
            t.name = 'Serviço de Convivência e Fortalecimento de Vínculos' AND
            t.canDelete = false AND
            t.isCollective = true AND
            au.id = ${this.attendance_unity} AND
            MONTH(a.\`date\`) = ${this.month} AND 
            YEAR(a.\`date\`) = ${this.year};
    `;

    this.bloco3.childStrengtheningServices = Number(count[0].count);
    return this;
  }

  public async withChildTeenStrengtheningServices(): Promise<CrasBloco3Builder> {
    const count: number = await this.prisma.$queryRaw`
        SELECT COUNT(ui.id) as count
        FROM user_identify ui
        INNER JOIN family f ON f.id = ui.family_fk 
        INNER JOIN attendance a ON a.user_identify_fk = ui.id 
        INNER JOIN attendance_unity au ON au.id = f.attendance_unity_fk 
        INNER JOIN task t ON t.id = a.task_fk
        WHERE 
            au.\`type\` = 'CRAS' AND
            a.user_identify_fk != NULL AND
            7 <= TIMESTAMPDIFF(YEAR, ui.birthday, CURDATE()) AND TIMESTAMPDIFF(YEAR, ui.birthday, CURDATE()) >= 14 AND
            t.name = 'Serviço de Convivência e Fortalecimento de Vínculos' AND
            t.canDelete = false AND
            t.isCollective = true AND
            au.id = ${this.attendance_unity} AND
            MONTH(a.\`date\`) = ${this.month} AND 
            YEAR(a.\`date\`) = ${this.year};
    `;

    this.bloco3.childTeenStrengtheningServices = Number(count[0].count);
    return this;
  }

  public async withTeenStrengtheningServices(): Promise<CrasBloco3Builder> {
    const count: number = await this.prisma.$queryRaw`
        SELECT COUNT(ui.id) as count
        FROM user_identify ui
        INNER JOIN family f ON f.id = ui.family_fk 
        INNER JOIN attendance a ON a.user_identify_fk = ui.id 
        INNER JOIN attendance_unity au ON au.id = f.attendance_unity_fk 
        INNER JOIN task t ON t.id = a.task_fk
        WHERE 
            au.\`type\` = 'CRAS' AND
            a.user_identify_fk != NULL AND
            15 <= TIMESTAMPDIFF(YEAR, ui.birthday, CURDATE()) AND TIMESTAMPDIFF(YEAR, ui.birthday, CURDATE()) >= 17 AND
            t.name = 'Serviço de Convivência e Fortalecimento de Vínculos' AND
            t.canDelete = false AND
            t.isCollective = true AND
            au.id = ${this.attendance_unity} AND
            MONTH(a.\`date\`) = ${this.month} AND 
            YEAR(a.\`date\`) = ${this.year};
    `;

    this.bloco3.teenStrengtheningServices = Number(count[0].count);
    return this;
  }

  public async withAdultStrengtheningServices(): Promise<CrasBloco3Builder> {
    const count: number = await this.prisma.$queryRaw`
        SELECT COUNT(ui.id) as count
        FROM user_identify ui
        INNER JOIN family f ON f.id = ui.family_fk 
        INNER JOIN attendance a ON a.user_identify_fk = ui.id 
        INNER JOIN attendance_unity au ON au.id = f.attendance_unity_fk 
        INNER JOIN task t ON t.id = a.task_fk
        WHERE 
            au.\`type\` = 'CRAS' AND
            a.user_identify_fk != NULL AND
            18 <= TIMESTAMPDIFF(YEAR, ui.birthday, CURDATE()) AND TIMESTAMPDIFF(YEAR, ui.birthday, CURDATE()) >= 59 AND
            t.name = 'Serviço de Convivência e Fortalecimento de Vínculos' AND
            t.canDelete = false AND
            t.isCollective = true AND
            au.id = ${this.attendance_unity} AND
            MONTH(a.\`date\`) = ${this.month} AND 
            YEAR(a.\`date\`) = ${this.year};
    `;

    this.bloco3.adultStrengtheningServices = Number(count[0].count);
    return this;
  }

  public async withElderlyStrengtheningServices(): Promise<CrasBloco3Builder> {
    const count: number = await this.prisma.$queryRaw`
        SELECT COUNT(ui.id) as count
        FROM user_identify ui
        INNER JOIN family f ON f.id = ui.family_fk 
        INNER JOIN attendance a ON a.user_identify_fk = ui.id 
        INNER JOIN attendance_unity au ON au.id = f.attendance_unity_fk 
        INNER JOIN task t ON t.id = a.task_fk
        WHERE 
            au.\`type\` = 'CRAS' AND
            a.user_identify_fk != NULL AND
            TIMESTAMPDIFF(YEAR, ui.birthday, CURDATE()) > 59 AND
            t.name = 'Serviço de Convivência e Fortalecimento de Vínculos' AND
            t.canDelete = false AND
            t.isCollective = true AND
            au.id = ${this.attendance_unity} AND
            MONTH(a.\`date\`) = ${this.month} AND 
            YEAR(a.\`date\`) = ${this.year};
    `;

    this.bloco3.elderlyStrengtheningServices = Number(count[0].count);
    return this;
  }

  public async withPeopleOtherCollectiveActivities(): Promise<CrasBloco3Builder> {
    const count: number = await this.prisma.$queryRaw`
        SELECT COUNT(ui.id) as count
        FROM user_identify ui
        INNER JOIN family f ON f.id = ui.family_fk 
        INNER JOIN attendance_unity au ON au.id = f.attendance_unity_fk
        INNER JOIN attendance a ON a.user_identify_fk = ui.id
        INNER JOIN task t ON t.id = a.task_fk
        WHERE 
            au.\`type\` = 'CRAS' AND
            a.user_identify_fk = NULL AND
            t.name = 'Palestras, oficinas e outras atividades coletivas de caráter não continuado' AND
            t.canDelete = false AND
            t.isCollective = true AND
            au.id = ${this.attendance_unity} AND
            MONTH(t.createdAt) = ${this.month} AND 
            YEAR(t.createdAt) = ${this.year};
    `;

    this.bloco3.peopleOtherCollectiveActivities = Number(count[0].count);
    return this;
  }

  public async withPeopleWithDeficiencyStrengtheningServicesOrGroupsPAIF(): Promise<CrasBloco3Builder> {
    const count: number = await this.prisma.$queryRaw`
        SELECT COUNT(ui.id) as count
        FROM user_identify ui
        INNER JOIN family f ON f.id = ui.family_fk 
        INNER JOIN attendance a ON a.user_identify_fk = ui.id 
        INNER JOIN attendance_unity au ON au.id = f.attendance_unity_fk 
        INNER JOIN task t ON t.id = a.task_fk
        WHERE 
            au.\`type\` = 'CRAS' AND
            a.user_identify_fk IS NOT NULL AND
            ui.is_deficiency = true AND
            (
                t.name = 'Grupo desenvolvido pelo PAIF' OR 
                t.name = 'Serviço de Convivência e Fortalecimento de Vínculos'
            ) AND
            t.canDelete = false AND
            t.isCollective = true AND
            au.id = ${this.attendance_unity} AND
            MONTH(a.\`date\`) = ${this.month} AND 
            YEAR(a.\`date\`) = ${this.year};
    `;

    this.bloco3.peopleWithDeficiencyStrengtheningServicesOrGroupsPAIF = Number(
      count[0].count,
    );
    return this;
  }

  public async build(): Promise<CrasBloco3> {
    return this.bloco3;
  }
}
