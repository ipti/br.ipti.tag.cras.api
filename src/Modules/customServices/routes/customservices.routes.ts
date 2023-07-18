const routes = require("express").Router();

import { celebrate, Joi, Segments } from "celebrate";

import ChangeDatabaseConnection from "../../../middlewares/changeDatabaseConnection";
import { CustomServicesController } from "../controller/customservices.controller";


routes.route("/service").post(
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            request: Joi.string().required(),
            result: Joi.string().required(),
            arrangements: Joi.string().required(),
            service: Joi.number().required(),
            responsible_technician: Joi.number().required(),
            user_or_family_members: Joi.number().required(),
            date_service: Joi.date().required()
        }),
    }),
    ChangeDatabaseConnection.changeDatabase,
    CustomServicesController().CreateCustomServices
);

routes.route("/service").get(ChangeDatabaseConnection.changeDatabase, CustomServicesController().getAllCustomServices);

routes.route("/service/:id").get(
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required(),
        }),
    }),
    ChangeDatabaseConnection.changeDatabase,
    CustomServicesController().getCustomServicesById
)

routes.route("/service/:id").put(
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            request: Joi.string().required(),
            result: Joi.string().required(),
            arrangements: Joi.string().required(),
            service: Joi.number().required(),
            responsible_technician: Joi.number().required(),
            user_or_family_members: Joi.number().required(),
            date_service: Joi.date().required()
        }),
    }),
    ChangeDatabaseConnection.changeDatabase,
    CustomServicesController().updateCustomServices
)

routes.route("/service/:id").delete(
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required(),
        }),
    }),
    ChangeDatabaseConnection.changeDatabase,
    CustomServicesController().deleteCustomServices
);

export default routes;
