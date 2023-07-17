import { RequestHandler } from "express";
import { AuthService } from "../services/auth.services";
import { makeErrorMessage } from "../../../util/error.services";
import { ErrorType } from "../../../util/error.type";

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
    const authService = AuthService();
    const authorization = req.headers.authorization;
    const token = authorization?.split(" ");
    if(token === undefined){
      const error: ErrorType = makeErrorMessage("Token não encontrado", 401);
      throw error;
    }
    const decoded = await authService.verifyToken(token);
    Object.assign(req, { userId: decoded });
    return next();
  } catch (err: any) {
    return res.status(err.code).json({ message: err.message });
  }
};