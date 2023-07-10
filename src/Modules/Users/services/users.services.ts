
import Users, { UserAttributes } from "../model/users.model";
import { makeErrorMessage } from "../../../util/error.services";
import { ErrorType } from "../../../util/error.type";
import { Knex } from "knex";
import { Request } from "express";




export const UserServices = () => {

    const validUserToCreate = async (knex: Knex, body: UserAttributes) => {
        const validUser = await getUserByUserEmail(knex, body.email);
        if (validUser) {
            const error: ErrorType = makeErrorMessage(
                "user already exists",
                409
                );
                throw error;
            }

            const objection = await Users.query(knex)
            .insert(body)
            .catch((err: any) => {
                const error: ErrorType = makeErrorMessage("Error creating user", 500);
                throw error;
            })
            .finally(() => {
                knex.destroy();
            });
            
            console.log(objection)


        return objection;
    }

    const getUserByUserEmail = async (knex: Knex, email: string) => {
        const objection = await Users.query(knex)
            .where({ email: email })
            .then((res) => {
                if (!res) {
                    const error: ErrorType = makeErrorMessage("User not found", 404);
                    throw error;
                }
                return res;
            })
            .finally(() => {
                knex.destroy();
            });
        return objection[0];
    };



    const getUserById = async (knex: Knex, request: Request, id: string) => {
        const query = request.query;
        const objection = await Users.query(knex)
            .findById(id)
            .where(query)
            .then((res) => {
                if (!res) {
                    const error: ErrorType = makeErrorMessage("User not found", 404);
                    throw error;
                }
                return res;
            })
            .finally(() => {
                knex.destroy();
            });

        return objection;
    };

    const getAllUsers = async (knex: Knex, request: Request) => {
        const query = request.query;
        const objection = (
            await Users.query(knex)
                .where(query)
                .then((res) => {
                    if (res.length === 0) {
                        const error: ErrorType = makeErrorMessage("Users not found", 404);
                        throw error;
                    }
                    return res;
                }).finally(() => {
                    knex.destroy();
                }))

        return objection;
    };

    const updateUser = async (knex: Knex, id: string, body: UserAttributes) => {

        const objection = (
            await Users.query(knex)
                .updateAndFetchById(id, body)
                .catch((err: any) => {
                    const error: ErrorType = makeErrorMessage("User cannot be updated!", 401);
                    throw error;
                }).finally(() => {
                    knex.destroy();
                })
        )
        return objection;
    };

    const deleteUser = async (knex: Knex, id: string) => {

        const objection = await Users.query(knex)
            .deleteById(id).catch((err: any) => {
                const error: ErrorType = makeErrorMessage("User cannot be deleted!", 401);
                throw error;
            }).finally(() => {
                knex.destroy();
            })
    };

    return {
        validUserToCreate, getAllUsers, updateUser, deleteUser, getUserById, getUserByUserEmail
    }
}

