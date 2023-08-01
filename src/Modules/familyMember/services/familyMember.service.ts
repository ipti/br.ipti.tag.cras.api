
import DbConnection from "../../../db/config";
import { makeErrorMessage } from "../../../util/error.services";
import { ErrorType } from "../../../util/error.type";

import { membro_familiar, membro_familiarAttributes} from "../model/familyMember.model"


export const FamilyMemberServices = () => {

    const connection = DbConnection.getInstance().getConnection();

    const validFamilyMemberToCreate = async (body: membro_familiarAttributes) => {

        try {
            const user = await membro_familiar.create({ ...body });
            return user;
        } catch(error) {
            const err: ErrorType = makeErrorMessage(
                `${error}`,
                500
            );
            throw err;
        }
        
      
    }

    const getFamilyMemberByName = async (nome: string) => {
        const user: membro_familiarAttributes | null = await membro_familiar.findOne({ where: { nome } });
        return user;
    };



    const getFamilyMemberById = async (id: string) => {
        const user: membro_familiarAttributes | null = await membro_familiar.findByPk(id);
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

    const getAllFamilyMember = async () => {
        const allUsers: membro_familiarAttributes[] = await membro_familiar.findAll();
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

    const updateFamilyMember = async (id: string, body: membro_familiarAttributes) => {
        await getFamilyMemberById(id);
        await membro_familiar.update({ ...body }, { where: { id } });
        const updatedUser: membro_familiarAttributes | never[] = await getFamilyMemberById(id);
        return updatedUser;
    };



    const deleteFamilyMember = async (id: string) => {
        const deletedUser: membro_familiarAttributes | null = await membro_familiar.findByPk(id);
        await membro_familiar.destroy({ where: { id } });
        return deletedUser;
    };

    return {
        validFamilyMemberToCreate, getAllFamilyMember, updateFamilyMember, deleteFamilyMember, getFamilyMemberById, getFamilyMemberByName
    }
}
