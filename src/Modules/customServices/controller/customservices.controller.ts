import { RequestHandler } from "express";
import { AtendimentosServices } from "../services/customservices.services";


export const CustomServicesController = () => {


    const CreateCustomServices: RequestHandler = async (req, res, next) => {
        try {
            const services = await AtendimentosServices().validCustomSevicesToCreate(req.body);
            return res
                .status(200)
                .json({ message: "Services created successfully", data: services });
        } catch (err: any) {
            console.log(err)
            return res.status(err.code).json({ message: err.message });
        }
    }

    const deleteCustomServices: RequestHandler = async (req, res, next) => {
        try {
            const { id } = req.params;
            const deletedCustomServices = await AtendimentosServices().deleteCustomServices(id);
            return res
                .status(200)
                .json({ message: "Service deleted successfully", data: deletedCustomServices });
        } catch (err: any) {
            return res.status(err.code).json({ message: err.message });
        }
    };

    const getAllCustomServices: RequestHandler = async (req, res, next) => {
        try {
            const allCustomServices = await AtendimentosServices().getAllCustomSevices();
            return res
                .status(200)
                .json({ message: "Services fetched successfully", data: allCustomServices });
        } catch (err: any) {
            return res.status(err.code).json({ message: err.message });
        }
    };

    const getCustomServicesById: RequestHandler = async (req, res, next) => {
        try {
            const { id } = req.params;
            const service = await AtendimentosServices().getCustomSevicesById(id);
            return res
                .status(200)
                .json({ message: "User fetched successfully", data: service });
        } catch (err: any) {
            return res.status(err.code).json({ message: err.message });
        }
    };

    const updateCustomServices: RequestHandler = async (req, res, next) => {
        try {
            const { id } = req.params;
            const updatedCustomServices = await AtendimentosServices().updateCustomServices(id, req.body);
            return res
                .status(200)
                .json({ message: "Services updated successfully", data: updatedCustomServices });
        } catch (err: any) {
            return res.status(err.code).json({ message: err.message });
        }
    };

    return {
        CreateCustomServices, deleteCustomServices, getAllCustomServices, getCustomServicesById, updateCustomServices
    }
}
