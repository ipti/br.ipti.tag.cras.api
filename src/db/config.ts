import { Sequelize } from 'sequelize';
require('dotenv').config();

// const dbName = 'cras-db';
// const dbUser = 'root';
// const dbHost = 'localhost';
// const dbPassword = 'root';

class DbConnection {
  private static _instance: DbConnection;
  private localConnection?: Sequelize;

  private constructor() {
    console.log(process.env.dbName);
    this.localConnection = new Sequelize({
      dialect: 'mariadb',
      host: process.env.dbHost,
      database: process.env.dbName,
      username: process.env.dbUser,
      password: process.env.dbPassword,
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
      host: process.env.dbHost,
      database: dbName,
      username: process.env.dbUser,
      password: process.env.dbPassword,
    });
    return this.localConnection!;
  }

  getConnection(): Sequelize {
    return this.localConnection!;
  }
}

export const sequelize = DbConnection.getInstance().getConnection();
export default DbConnection;
