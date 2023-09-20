import { RequestHandler } from "express";
import { HomeCrasServices } from "../services/homeCras.service";


export const HomeCrasController = () => {


    const services: RequestHandler = async (req, res, next) => {
        try {
            const user = await HomeCrasServices().servicesResume(req.body);
            return res
                .status(200)
                .json({ message: "User created successfully", data: user });
        } catch (err: any) {
            return res.status(err.code).json({ message: err.message });
        }
    }

    

    return {
        services
    }
}
