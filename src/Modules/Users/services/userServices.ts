
import Users from "../model/index";
import { makeErrorMessage } from "../../util/errorServices";
import { ErrorType } from "../../util/errorType";


export const UserServices = () => {

    const validUserToCreate = async (body: Users) => {
        const validUser = await getUserByUserEmail(body.email);
        if (validUser) {
            const error: ErrorType = makeErrorMessage(
                "Username already exists",
                409
            );
            throw error;
        }
        const user = await Users.create({ ...body });
        return user;
    }

    const getUserByUserEmail = async (email: string) => {
        const user: Users | null = await Users.findOne({ where: { email } });
        return user;
    };



    const getUserById = async (id: string) => {
        const user: Users | null = await Users.findByPk(id);
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
        const allUsers: Users[] = await Users.findAll();
        if (allUsers.length === 0) {
            const error: ErrorType = makeErrorMessage(
                "No users found",
                404
            );
            throw error;
        }
        return allUsers;
    };

    const updateUser = async (id: string, body: Users) => {
        await getUserById(id);
        await Users.update({ ...body }, { where: { id } });
        const updatedUser: Users | null = await getUserById(id);
        return updatedUser;
    };



    const deleteUser = async (id: string) => {
        const deletedUser: Users | null = await Users.findByPk(id);
        await Users.destroy({ where: { id } });
        return deletedUser;
    };

    return {
        validUserToCreate, getAllUsers, updateUser, deleteUser, getUserById, getUserByUserEmail
    }
}

