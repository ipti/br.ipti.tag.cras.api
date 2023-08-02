const routes = require("express").Router();

import { celebrate, Joi, Segments } from "celebrate";

import ChangeDatabaseConnection from "../../../middlewares/changeDatabaseConnection";
import { TechnicianController } from "../controller/technician.controller";
import { verifyToken } from "../../auth/controller/auth.controller";

routes.route("/technician").post(
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            nome: Joi.string().required(),
        }),
    }),
    ChangeDatabaseConnection.changeDatabase,
    verifyToken,
    TechnicianController().CreateTechnician
);

routes.route("/technician").get(ChangeDatabaseConnection.changeDatabase, verifyToken, TechnicianController().getAllTechnician);

routes.route("/technician/:id").get(
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required(),
        }),
    }),
    ChangeDatabaseConnection.changeDatabase,
    verifyToken,
    TechnicianController().getTechnicianById
)

routes.route("/technician/:id").put(
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            nome: Joi.string().required(),
        }),
    }),
    ChangeDatabaseConnection.changeDatabase,
    verifyToken,
    TechnicianController().updateTechnician
)

routes.route("/technician/:id").delete(
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required(),
        }),
    }),
    ChangeDatabaseConnection.changeDatabase,
    verifyToken,
    TechnicianController().deleteTechnician
);

export default routes;
