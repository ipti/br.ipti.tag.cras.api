import { RequestHandler } from "express";
import DbConnection from "../db/config";
import { Sequelize, DataTypes } from 'sequelize';
// import Users from "../users/model/users.model";

export default class ChangeDatabaseConnection {
  public static changeDatabase: RequestHandler = async (req, res, next) => {
    const dbName = req.headers["dbname"] as string;

    DbConnection.getInstance().setConnection(dbName);

    // Users(DbConnection.getInstance().getConnection()).findAll().then((users) => { console.log(users) });
    
    next();
  };
}