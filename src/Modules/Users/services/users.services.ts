
import Users, { UserAttributes } from "../model/users.model";
import { makeErrorMessage } from "../../../util/error.services";
import { ErrorType } from "../../../util/error.type";
import DbConnection from "../../../db/config";


export const UserServices = () => {

    const connection = DbConnection.getInstance().getConnection();

    const validUserToCreate = async (body: UserAttributes) => {
        const validUser = await getUserByUserEmail(body.email);
        if (validUser) {
            const error: ErrorType = makeErrorMessage(
                "Username already exists",
                409
            );
            throw error;
        }
        const user = await Users(connection).create({ ...body });
        return user;
    }

    const getUserByUserEmail = async (email: string) => {
        const user: UserAttributes | null = await Users(connection).findOne({ where: { email } });
        return user;
    };



    const getUserById = async (id: string) => {
        const user: UserAttributes | null = await Users(connection).findByPk(id);
        if (!user) {
            const error: ErrorType = makeErrorMessage(
                "User not found",
                404
            );
            throw error;
        }
        return user;
    };

    const getAllUsers = async () => {
        const allUsers: UserAttributes[] = await Users(connection).findAll();
        if (allUsers.length === 0) {
            const error: ErrorType = makeErrorMessage(
                "No users found",
                404
            );
            throw error;
        }
        return allUsers;
    };

    const updateUser = async (id: string, body: UserAttributes) => {
        await getUserById(id);
        await Users(connection).update({ ...body }, { where: { id } });
        const updatedUser: UserAttributes | null = await getUserById(id);
        return updatedUser;
    };



    const deleteUser = async (id: string) => {
        const deletedUser: UserAttributes | null = await Users(connection).findByPk(id);
        await Users(connection).destroy({ where: { id } });
        return deletedUser;
    };

    return {
        validUserToCreate, getAllUsers, updateUser, deleteUser, getUserById, getUserByUserEmail
    }
}
