const routes = require("express").Router();

import { celebrate, Joi, Segments } from "celebrate";

import ChangeDatabaseConnection from "../../../middlewares/changeDatabaseConnection";
import { CustomServicesController } from "../controller/customservices.controller";
import { verifyToken } from "../../auth/controller/auth.controller";


routes.route("/service").post(
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            solicitacao: Joi.string().required(),
            resultado: Joi.string().required(),
            encaminhamento: Joi.string().required(),
            servico: Joi.string().required(),
            tecnico: Joi.string().required(),
            id_identificacao_usuario: Joi.number(),
            id_membro_familiar: Joi.number(),
            data: Joi.string().required()
        }),
    }),
    ChangeDatabaseConnection.changeDatabase,
    verifyToken,
    CustomServicesController().CreateCustomServices
);

routes.route("/service").get(ChangeDatabaseConnection.changeDatabase, verifyToken, CustomServicesController().getAllCustomServices);

routes.route("/service/:id").get(
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required(),
        }),
    }),
    ChangeDatabaseConnection.changeDatabase,
    verifyToken,
    CustomServicesController().getCustomServicesById
)

routes.route("/service/:id").put(
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            solicitacao: Joi.string().required(),
            resultado: Joi.string().required(),
            encaminhamento: Joi.string().required(),
            servico: Joi.string().required(),
            tecnico: Joi.string().required(),
            id_identificacao_usuario: Joi.number(),
            id_membro_familiar: Joi.number(),
            data: Joi.string().required()
        }),
    }),
    ChangeDatabaseConnection.changeDatabase,
    verifyToken,
    CustomServicesController().updateCustomServices
)

routes.route("/service/:id").delete(
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required(),
        }),
    }),
    ChangeDatabaseConnection.changeDatabase,
    verifyToken,
    CustomServicesController().deleteCustomServices
);

export default routes;
