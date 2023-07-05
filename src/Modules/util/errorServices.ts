import { ErrorType } from "./errorType";

export const makeErrorMessage = (message: string, code: number) => {
    const error: ErrorType = {
        code,
        message,
    };
    return error;
};