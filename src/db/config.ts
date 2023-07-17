import { Sequelize } from 'sequelize';

const dbName = 'cras-db';
const dbUser = 'root';
const dbHost = 'localhost';
const dbPassword = 'root';

class DbConnection {
  private static _instance: DbConnection;
  private localConnection?: Sequelize;

  private constructor() {
    this.localConnection = new Sequelize({
      dialect: 'mariadb',
      host: dbHost,
      database: dbName,
      username: dbUser,
      password: dbPassword,
    });
  }

  static getInstance(): DbConnection {
    if (!DbConnection._instance) {
      DbConnection._instance = new DbConnection();
    }
    return DbConnection._instance;
  }

  setConnection(dbName: string): Sequelize {
    this.localConnection = new Sequelize({
      dialect: 'mariadb',
      host: dbHost,
      database: dbName,
      username: dbUser,
      password: dbPassword,
    });
    return this.localConnection!;
  }

  getConnection(): Sequelize {
    return this.localConnection!;
  }
}

export const sequelize = DbConnection.getInstance().getConnection();
export default DbConnection;
