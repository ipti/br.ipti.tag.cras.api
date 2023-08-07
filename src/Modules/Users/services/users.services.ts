
import DbConnection from "../../../db/config";
import { makeErrorMessage } from "../../../util/error.services";
import { ErrorType } from "../../../util/error.type";
import User, { UserAttributes } from "../model/users.model";


export const UserServices = () => {

    const connection = DbConnection.getInstance().getConnection();

    const validUserToCreate = async (body: UserAttributes) => {

        // console.log(connection)
       try{ const validUser = await getUserByUserEmail(body.email);
        if (validUser) {
            const error: ErrorType = makeErrorMessage(
                "Username already exists",
                409
            );
            throw error;
        }
        const user = await User.create({ ...body });
        return user;
    }catch(error){
        const err: ErrorType = makeErrorMessage(
            `${error}`,
            500
          );
          throw err;
    }
    }

    const getUserByUserEmail = async (email: string) => {
        const user: UserAttributes | null = await User.findOne({ where: { email } });
        return user;
    };



    const getUserById = async (id: string) => {
        const user: UserAttributes | null = await User.findByPk(id);
        if (!user) {
            // const error: ErrorType = makeErrorMessage(
            //     "User not found",
            //     404
            // );
            // throw error;
            return [];
        }
        return user;
    };

    const getAllUsers = async () => {
        const allUsers: UserAttributes[] = await User.findAll();
        if (allUsers.length === 0) {
            // const error: ErrorType = makeErrorMessage(
            //     "No users found",
            //     404
            // );
            // throw error;
            return []
        }
        return allUsers;
    };

    const updateUser = async (id: string, body: UserAttributes) => {
        await getUserById(id);
        await User.update({ ...body }, { where: { id } });
        const updatedUser: UserAttributes | never[] = await getUserById(id);
        return updatedUser;
    };



    const deleteUser = async (id: string) => {
        const deletedUser: UserAttributes | null = await User.findByPk(id);
        await User.destroy({ where: { id } });
        return deletedUser;
    };

    return {
        validUserToCreate, getAllUsers, updateUser, deleteUser, getUserById, getUserByUserEmail
    }
}
