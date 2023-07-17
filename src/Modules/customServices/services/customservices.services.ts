
import { makeErrorMessage } from "../../../util/error.services";
import { ErrorType } from "../../../util/error.type";
import DbConnection from "../../../db/config";
import CustomServices, { CustomServicesAttributes } from "../model/customservices.model";


export const CustomServicesServices = () => {

    const connection = DbConnection.getInstance().getConnection();

    const validCustomSevicesToCreate = async (body: CustomServicesAttributes) => {
        const services = await CustomServices(connection).create({ ...body });
        return services;
    }

    // const getUserByServicesEmail = async (email: string) => {
    //     const user: CustomServicesAttributes | null = await CustomServices(connection).findOne({ where: { email } });
    //     return user;
    // };



    const getCustomSevicesById = async (id: string) => {
        const user: CustomServicesAttributes | null = await CustomServices(connection).findByPk(id);
        if (!user) {
            const error: ErrorType = makeErrorMessage(
                "User not found",
                404
            );
            throw error;
        }
        return user;
    };

    const getAllCustomSevices = async () => {
        const allServices: CustomServicesAttributes[] = await CustomServices(connection).findAll();
        if (allServices.length === 0) {
            const error: ErrorType = makeErrorMessage(
                "No users found",
                404
            );
            throw error;
        }
        return allServices;
    };

    const updateCustomServices = async (id: string, body: CustomServicesAttributes) => {
        await getCustomSevicesById(id);
        await CustomServices(connection).update({ ...body }, { where: { id } });
        const updatedUser: CustomServicesAttributes | null = await getCustomSevicesById(id);
        return updatedUser;
    };



    const deleteCustomServices = async (id: string) => {
        const deletedUser: CustomServicesAttributes | null = await CustomServices(connection).findByPk(id);
        await CustomServices(connection).destroy({ where: { id } });
        return deletedUser;
    };

    return {
        updateCustomServices, deleteCustomServices, validCustomSevicesToCreate, getAllCustomSevices, getCustomSevicesById
    }
}
