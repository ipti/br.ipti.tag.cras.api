
import DbConnection from "../../../db/config";
import { makeErrorMessage } from "../../../util/error.services";
import { ErrorType } from "../../../util/error.type";
import { tecnico, tecnicoAttributes } from "../model/technician.model";


export const TechnicianServices = () => {

    const connection = DbConnection.getInstance().getConnection();

    const validTechnicianToCreate = async (body: tecnicoAttributes) => {

        const validUser = await getTechnicianByName(body.nome);
        if (validUser) {
            const error: ErrorType = makeErrorMessage(
                "Username already exists",
                409
            );
            throw error;
        }
        const user = await tecnico.create({ ...body });
        return user;
    }

    const getTechnicianByName = async (nome: string) => {
        const user: tecnicoAttributes | null = await tecnico.findOne({ where: { nome } });
        return user;
    };



    const getTechnicianById = async (id: string) => {
        const user: tecnicoAttributes | null = await tecnico.findByPk(id);
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

    const getAllTechnician = async () => {
        const allUsers: tecnicoAttributes[] = await tecnico.findAll();
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

    const updateTechnician = async (id: string, body: tecnicoAttributes) => {
        await getTechnicianById(id);
        await tecnico.update({ ...body }, { where: { id } });
        const updatedUser: tecnicoAttributes | never[] = await getTechnicianById(id);
        return updatedUser;
    };



    const deleteTechnician = async (id: string) => {
        const deletedUser: tecnicoAttributes | null = await tecnico.findByPk(id);
        await tecnico.destroy({ where: { id } });
        return deletedUser;
    };

    return {
        validTechnicianToCreate, getAllTechnician, updateTechnician, deleteTechnician, getTechnicianById, getTechnicianByName
    }
}
