import { RequestHandler } from "express";
import { TypeServicesServices } from "../services/typeServices.services";


export const TypeServicesController = () => {


    const CreateTypeServices: RequestHandler = async (req, res, next) => {
        try {
            const user = await TypeServicesServices().validTypeServicesToCreate(req.body);
            return res
                .status(200)
                .json({ message: "User created successfully", data: user });
        } catch (err: any) {
            return res.status(err.code).json({ message: err.message });
        }
    }

    const deleteTypeServices: RequestHandler = async (req, res, next) => {
        try {
            const { id } = req.params;
            const deletedUser = await TypeServicesServices().deleteTypeServices(id);
            return res
                .status(200)
                .json({ message: "User deleted successfully", data: deletedUser });
        } catch (err: any) {
            return res.status(err.code).json({ message: err.message });
        }
    };

    const getAllTypeServices: RequestHandler = async (req, res, next) => {
        try {
            const allUsers = await TypeServicesServices().getAllTypeServices();
            return res
                .status(200)
                .json({ message: "Users fetched successfully", data: allUsers });
        } catch (err: any) {
            return res.status(err.code).json({ message: err.message });
        }
    };

    const getTypeServicesById: RequestHandler = async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await TypeServicesServices().getTypeServicesById(id);
            return res
                .status(200)
                .json({ message: "User fetched successfully", data: user });
        } catch (err: any) {
            return res.status(err.code).json({ message: err.message });
        }
    };

    const updateTypeServices: RequestHandler = async (req, res, next) => {
        try {
            const { id } = req.params;
            const updatedUser = await TypeServicesServices().updateTypeServices(id, req.body);
            return res
                .status(200)
                .json({ message: "User updated successfully", data: updatedUser });
        } catch (err: any) {
            return res.status(err.code).json({ message: err.message });
        }
    };

    return {
        CreateTypeServices, updateTypeServices, getTypeServicesById, getAllTypeServices, deleteTypeServices
    }
}
