import { RequestHandler } from "express";
import { UserServices } from "../services/users.services";


export const UserController = () => {

    const userServices = UserServices() 


    const CreateUser: RequestHandler = async (req, res, next) => {
        const knex = req.app.locals.knex;
        console.log("euuu")

        try {
            const user = await userServices.validUserToCreate(knex ,req.body);
            return res
                .status(200)
                .json({ message: "User created successfully", data: user });
        } catch (err: any) {
            return res.status(err.code).json({ message: err.message });
        }
    }

    const deleteUser: RequestHandler = async (req, res, next) => {
        const knex = req.app.locals.knex;
        try {
            const { id } = req.params;
            const deletedUser = await userServices.deleteUser(knex, id);
            return res
                .status(200)
                .json({ message: "User deleted successfully", data: deletedUser });
        } catch (err: any) {
            return res.status(err.code).json({ message: err.message });
        }
    };

    const getAllUsers: RequestHandler = async (req, res, next) => {

        const knex = req.app.locals.knex;
        try {
            const allUsers = await userServices.getAllUsers(knex, req);
            return res
                .status(200)
                .json({ message: "Users fetched successfully", data: allUsers });
        } catch (err: any) {
            return res.status(err.code).json({ message: err.message });
        }
    };

    const getUserById: RequestHandler = async (req, res, next) => {

        const knex = req.app.locals.knex;
        try {
            const { id } = req.params;
            const user = await userServices.getUserById(knex, req, id);
            return res
                .status(200)
                .json({ message: "User fetched successfully", data: user });
        } catch (err: any) {
            return res.status(err.code).json({ message: err.message });
        }
    };

    const updateUser: RequestHandler = async (req, res, next) => {
        const knex = req.app.locals.knex;
        try {
            const { id } = req.params;
            const updatedUser = await userServices.updateUser(knex, id, req.body);
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

