import { makeErrorMessage } from "../../../util/error.services";
import { ErrorType } from "../../../util/error.type";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { UserServices } from "../../Users/services/users.services";


export const AuthService = () => {

  const validLogin = async (email: string, password: string) => {
      const user = await UserServices().getUserByUserEmail(email);
      if (!user) {
        const error: ErrorType = makeErrorMessage("Usuário não encontrado", 404);
        throw error;
      }
      async function match(plainTextPassword: string, hashedPassword: string) {
        if (!plainTextPassword || !hashedPassword) {
          return false;
        }

        const isMatch = bcrypt.compareSync(plainTextPassword, hashedPassword);

        if (isMatch) {
          return true;
        } else {
          return false;
        }
      }

      const passwordMatch = await match(password, user?.password);

      if (!passwordMatch) {
        const error: ErrorType = makeErrorMessage(
          "Senha incorreta",
          401
        );
        throw error;
      }

      // user.password = "undefined";
      const id = user.id;
      const token = jwt.sign({ id }, "sercretkeyfortagapi", { expiresIn: "3h" });

      return { token, id: id, auth: true };
    
  };

  const verifyToken = async (authorization: Array<string>) => {
    const header = authorization;

    try {
      if (header.length === 0) {
        const error: ErrorType = makeErrorMessage("Token não encontrado", 401);
        throw error;
      }

      function wrongFormat(type: string, token: string) {
        if (!type || !token) {
          return true;
        }
        return false;
      }

      const [type, token] = header;

      if (wrongFormat(type, token)) {
        const error: ErrorType = makeErrorMessage("Token mal formatado", 401);
        throw error;
      }

      const decoded: any = jwt.verify(token, "sercretkeyfortagapi");

      if (!decoded) {
        const error: ErrorType = makeErrorMessage("Token mal formatado", 401);
        throw error;
      }



      return decoded.id;
    } catch (error) {
      if (`${error}` === "TokenExpiredError: jwt expired") {
        const err: ErrorType = makeErrorMessage(
          `${error}`,
          403
        );
        throw err
      } else {

        const err: ErrorType = makeErrorMessage(
          `${error}`,
          500
        );
        throw err;
      }
    }
  }

  return {
    validLogin,
    verifyToken,
  }
}
