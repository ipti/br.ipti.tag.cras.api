import { Sequelize } from '@sequelize/core';
require('dotenv').config();

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;

class DbConnection {
  private static _instance: any;
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

  static getInstance() {
    if (!DbConnection._instance) {
      DbConnection._instance = new DbConnection();
    }
    return this._instance;
}

  setConnection(dbName: string) {
    this.localConnection = new Sequelize({
      dialect: 'mariadb',
      host: dbHost,
      database: dbName,
      username: dbUser,
      password: dbPassword,
    });
    return this.localConnection!;
  }

  getConnection() {
    return this.localConnection!;
  }
}

export default DbConnection;