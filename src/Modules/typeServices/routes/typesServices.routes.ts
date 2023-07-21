const routes = require("express").Router();

import { celebrate, Joi, Segments } from "celebrate";

import ChangeDatabaseConnection from "../../../middlewares/changeDatabaseConnection";
import { TypeServicesController } from "../controller/typeServices.controller";
import { verifyToken } from "../../auth/controller/auth.controller";

routes.route("/typesServices").post(
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
        }),
    }),
    ChangeDatabaseConnection.changeDatabase,
    verifyToken,
    TypeServicesController().CreateTypeServices
);

routes.route("/typesServices").get(ChangeDatabaseConnection.changeDatabase, verifyToken,TypeServicesController().getAllTypeServices);

routes.route("/typesServices/:id").get(
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required(),
        }),
    }),
    ChangeDatabaseConnection.changeDatabase,
    verifyToken,
    TypeServicesController().getTypeServicesById
)

routes.route("/typesServices/:id").put(
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
        }),
    }),
    ChangeDatabaseConnection.changeDatabase,
    verifyToken,
    TypeServicesController().updateTypeServices
)

routes.route("/typesServices/:id").delete(
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required(),
        }),
    }),
    ChangeDatabaseConnection.changeDatabase,
    verifyToken,
    TypeServicesController().deleteTypeServices
);

export default routes;
