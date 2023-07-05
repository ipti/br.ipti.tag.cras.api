import { RequestHandler } from "express";
import { AuthService } from "../services/authServices";

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await AuthService().validLogin(email, password);
    return res.status(200).json({ message: "Login successfully", data: token });
  } catch (err: any) {
    return res.status(err.code).json({ message: err.message });
  }
};

export const verifyToken: RequestHandler = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    const token = authorization!.split(" ");
    const decoded = await AuthService().verifyToken(token);
    Object.assign(req, { userId: decoded });
    return next();
  } catch (err: any) {
    return res.status(err.code).json({ message: err.message });
  }
};