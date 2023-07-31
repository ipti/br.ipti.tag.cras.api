
import DbConnection from "../../../db/config";
import { makeErrorMessage } from "../../../util/error.services";
import { ErrorType } from "../../../util/error.type";
import { servico, servicoAttributes } from "../model/typeServices.model";


export const TypeServicesServices = () => {

    const connection = DbConnection.getInstance().getConnection();

    const validTypeServicesToCreate = async (body: servicoAttributes) => {

        
        const user = await servico.create({ ...body });
        return user;
    }

    const getTypeServicesByName = async (name: string) => {
        const user: servicoAttributes | null = await servico.findOne({ where: { name } });
        return user;
    };



    const getTypeServicesById = async (id: string) => {
        const user: servicoAttributes | null = await servico.findByPk(id);
        if (!user) {
            // const error: ErrorType = makeErrorMessage(
            //     "User not found",
            //     404
            // );
            // throw error;
            return []
        }
        return user;
    };

    const getAllTypeServices = async () => {
        const allUsers: servicoAttributes[] = await servico.findAll();
        if (allUsers.length === 0) {
            // const error: ErrorType = makeErrorMessage(
            //     "No users found",
            //     404
            // );
            // throw error;
            return [];
        }
        return allUsers;
    };

    const updateTypeServices = async (id: string, body: servicoAttributes) => {
        await getTypeServicesById(id);
        await servico.update({ ...body }, { where: { id } });
        const updatedUser: servicoAttributes | never[] = await getTypeServicesById(id);
        return updatedUser;
    };



    const deleteTypeServices = async (id: string) => {
        const deletedUser: servicoAttributes | null = await servico.findByPk(id);
        await servico.destroy({ where: { id } });
        return deletedUser;
    };

    return {
        validTypeServicesToCreate, getAllTypeServices, updateTypeServices, deleteTypeServices, getTypeServicesById, getTypeServicesByName
    }
}
