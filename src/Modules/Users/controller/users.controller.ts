import { RequestHandler } from "express";
import { UserServices } from "../services/users.services";


export const UserController = () => {


    const CreateUser: RequestHandler = async (req, res, next) => {
        try {
            const user = await UserServices().validUserToCreate(req.body);
            return res
                .status(200)
                .json({ message: "User created successfully", data: user });
        } catch (err: any) {
            return res.status(err.code).json({ message: err.message });
        }
    }

    const deleteUser: RequestHandler = async (req, res, next) => {
        try {
            const { id } = req.params;
            const deletedUser = await UserServices().deleteUser(id);
            return res
                .status(200)
                .json({ message: "User deleted successfully", data: deletedUser });
        } catch (err: any) {
            return res.status(err.code).json({ message: err.message });
        }
    };

    const getAllUsers: RequestHandler = async (req, res, next) => {
        try {
            const allUsers = await UserServices().getAllUsers();
            return res
                .status(200)
                .json({ message: "Users fetched successfully", data: allUsers });
        } catch (err: any) {
            return res.status(err.code).json({ message: err.message });
        }
    };

    const getUserById: RequestHandler = async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await UserServices().getUserById(id);
            return res
                .status(200)
                .json({ message: "User fetched successfully", data: user });
        } catch (err: any) {
            return res.status(err.code).json({ message: err.message });
        }
    };

    const updateUser: RequestHandler = async (req, res, next) => {
        try {
            const { id } = req.params;
            const updatedUser = await UserServices().updateUser(id, req.body);
            return res
                .status(200)
                .json({ message: "User updated successfully", data: updatedUser });
        } catch (err: any) {
            return res.status(err.code).json({ message: err.message });
        }
    };

    return {
        CreateUser, updateUser, getUserById, getAllUsers, deleteUser
    }
}
