const routes = require("express").Router();

import { celebrate, Joi, Segments } from "celebrate";

import ChangeDatabaseConnection from "../../../middlewares/changeDatabaseConnection";
import { verifyToken } from "../../auth/controller/auth.controller";
import { HomeCrasController } from "../controller/homeCras.controller";

routes.route("/services-resume").get(
    ChangeDatabaseConnection.changeDatabase,
    verifyToken,
    HomeCrasController().services
);

export default routes;
