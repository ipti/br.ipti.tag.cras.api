import { RequestHandler } from "express";
import { AuthService } from "../services/auth.services";

export const login: RequestHandler = async (req, res, next) => {

  const authServices = AuthService();
  try {
    const knex = req.app.locals.knex;
    const { email, password } = req.body;
    const token = await authServices.validLogin(knex, email, password);
    return res.status(200).json({ message: "Login successfully", data: token });
  } catch (err: any) {
    return res.status(err.code).json({ message: err.message });
  }
};

export const verifyToken: RequestHandler = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    const token = authorization!.split(" ");
    console.log(token)
    const decoded = await AuthService().verifyToken(token);
    Object.assign(req, { userId: decoded });
    return "";
  } catch (err: any) {
    return res.status(err.code).json({ message: err.message });
  }
};