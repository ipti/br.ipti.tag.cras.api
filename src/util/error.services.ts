import { ErrorType } from "./error.type.js";

export const makeErrorMessage = (message: string, code: number) => {
    const error: ErrorType = {
        code,
        message,
    };
    return error;
};