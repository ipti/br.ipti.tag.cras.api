import { makeErrorMessage } from "../../../util/error.services";
import { ErrorType } from "../../../util/error.type";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Knex } from "knex";
import { UserServices } from "../../Users/services/users.services";
import { UserAttributes } from "../../Users/model/users.model";


export const AuthService = () => {

    const userServices = UserServices();

    const validLogin = async (knex: Knex,email: string, password: string) => {

        const user: any = await userServices.getUserByUserEmail(knex, email);
        if (!user) {
            const error: ErrorType = makeErrorMessage("Username not found", 404);
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
                "Password is incorrect",
                401
            );
            throw error;
        }

        user.password = "undefined";
        const id = user.id;
        const token = jwt.sign({ id }, "sercretkeyfortagapi", { expiresIn: "3h" });

        return { token, id: id, auth: true };
    };

    async function verifyToken(authorization: Array<string> | undefined) {
        const header = authorization;

        console.log(header)

        if (header!.length === 0) {
            const error: ErrorType = makeErrorMessage("Token não encontrado", 401);
            throw error;
        }

        if(!header){
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
    }

    return {
        validLogin,
        verifyToken,
    }
}

