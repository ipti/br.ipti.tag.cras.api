import { RequestHandler } from "express";
import DbConnection from "../db/config";
import { Knex } from "knex";

export default class ChangeDatabaseConnection {
  public static changeDatabase: RequestHandler = (req, res, next) => {
    const dbName = req.headers["dbname"] as string;

    const knex: Knex = DbConnection.getInstance().setConnection(dbName);
    
    req.app.locals.knex = knex;
    
    next();
  };
}