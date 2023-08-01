import { RequestHandler } from "express";
import { FamilyMemberServices } from "../services/familyMember.service";


export const FamilyMemberController = () => {


    const CreateFamilyMember: RequestHandler = async (req, res, next) => {
        try {
            const user = await FamilyMemberServices().validFamilyMemberToCreate(req.body);
            return res
                .status(200)
                .json({ message: "User created successfully", data: user });
        } catch (err: any) {
            return res.status(err.code).json({ message: err.message });
        }
    }

    const deleteFamilyMember: RequestHandler = async (req, res, next) => {
        try {
            const { id } = req.params;
            const deletedUser = await FamilyMemberServices().deleteFamilyMember(id);
            return res
                .status(200)
                .json({ message: "User deleted successfully", data: deletedUser });
        } catch (err: any) {
            return res.status(err.code).json({ message: err.message });
        }
    };

    const getAllFamilyMember: RequestHandler = async (req, res, next) => {
        try {
            const allUsers = await FamilyMemberServices().getAllFamilyMember();
            return res
                .status(200)
                .json({ message: "Users fetched successfully", data: allUsers });
        } catch (err: any) {
            return res.status(err.code).json({ message: err.message });
        }
    };

    const getFamilyMemberById: RequestHandler = async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await FamilyMemberServices().getFamilyMemberById(id);
            return res
                .status(200)
                .json({ message: "User fetched successfully", data: user });
        } catch (err: any) {
            return res.status(err.code).json({ message: err.message });
        }
    };

    const updateFamilyMember: RequestHandler = async (req, res, next) => {
        try {
            const { id } = req.params;
            const updatedUser = await FamilyMemberServices().updateFamilyMember(id, req.body);
            return res
                .status(200)
                .json({ message: "User updated successfully", data: updatedUser });
        } catch (err: any) {
            return res.status(err.code).json({ message: err.message });
        }
    };

    return {
        CreateFamilyMember, updateFamilyMember, getFamilyMemberById, getAllFamilyMember, deleteFamilyMember
    }
}
