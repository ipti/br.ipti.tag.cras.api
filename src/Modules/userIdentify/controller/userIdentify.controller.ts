import { RequestHandler } from "express";
import { UserIdentifyServices } from "../services/userIdentify.service";


export const UserIdentifyController = () => {


    const CreateUserIdentify: RequestHandler = async (req, res, next) => {
        try {
            const user = await UserIdentifyServices().validUserIdentifyToCreate(req.body);
            return res
                .status(200)
                .json({ message: "User created successfully", data: user });
        } catch (err: any) {
            console.log(err.code)
            return res.status(err.code).json({ message: err.message });
        }
    }

    const deleteUserIdentify: RequestHandler = async (req, res, next) => {
        try {
            const { id } = req.params;
            const deletedUser = await UserIdentifyServices().deleteUserIdentify(id);
            return res
                .status(200)
                .json({ message: "User deleted successfully", data: deletedUser });
        } catch (err: any) {
            return res.status(err.code).json({ message: err.message });
        }
    };

    const getAllUserIdentify: RequestHandler = async (req, res, next) => {
        try {
            const allUsers = await UserIdentifyServices().getAllUserIdentify();
            return res
                .status(200)
                .json({ message: "Users fetched successfully", data: allUsers });
        } catch (err: any) {
            return res.status(err.code).json({ message: err.message });
        }
    };

    const getUserIdentifyById: RequestHandler = async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await UserIdentifyServices().getUserIdentifyById(id);
            return res
                .status(200)
                .json({ message: "User fetched successfully", data: user });
        } catch (err: any) {
            return res.status(err.code).json({ message: err.message });
        }
    };

    const updateUserIdentify: RequestHandler = async (req, res, next) => {
        try {
            const { id } = req.params;
            const updatedUser = await UserIdentifyServices().updateUserIdentify(id, req.body);
            return res
                .status(200)
                .json({ message: "User updated successfully", data: updatedUser });
        } catch (err: any) {
            return res.status(err.code).json({ message: err.message });
        }
    };

    return {
        CreateUserIdentify, updateUserIdentify, getUserIdentifyById, getAllUserIdentify, deleteUserIdentify
    }
}
