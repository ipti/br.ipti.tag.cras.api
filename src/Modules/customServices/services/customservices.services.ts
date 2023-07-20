
import DbConnection from "../../../db/config";
import { makeErrorMessage } from "../../../util/error.services";
import { ErrorType } from "../../../util/error.type";
import { atendimentos, atendimentosAttributes } from "../model/customservices.model";


export const AtendimentosServices = () => {

    const connection = DbConnection.getInstance().getConnection();

    const validCustomSevicesToCreate = async (body: atendimentosAttributes) => {
        console.log(body)
        const services = await atendimentos.create({ ...body });
        return services;
    }

    // const getUserByServicesEmail = async (email: string) => {
    //     const user: CustomServicesAttributes | null = await CustomServices(connection).findOne({ where: { email } });
    //     return user;
    // };



    const getCustomSevicesById = async (id: string) => {
        const user: atendimentosAttributes | null = await atendimentos.findByPk(id);
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
        const allServices: atendimentosAttributes[] = await atendimentos.findAll();
        if (allServices.length === 0) {
            const error: ErrorType = makeErrorMessage(
                "No users found",
                404
            );
            throw error;
        }
        return allServices;
    };

    const updateCustomServices = async (id: string, body: atendimentosAttributes) => {
        await getCustomSevicesById(id);
        await atendimentos.update({ ...body }, { where: { id } });
        const updatedUser: atendimentosAttributes | null = await getCustomSevicesById(id);
        return updatedUser;
    };



    const deleteCustomServices = async (id: string) => {
        const deletedUser: atendimentosAttributes | null = await atendimentos.findByPk(id);
        await atendimentos.destroy({ where: { id } });
        return deletedUser;
    };

    return {
        updateCustomServices, deleteCustomServices, validCustomSevicesToCreate, getAllCustomSevices, getCustomSevicesById
    }
}
