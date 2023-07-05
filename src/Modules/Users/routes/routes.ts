const routes = require("express").Router();

import { celebrate, Joi, Segments } from "celebrate";
import { UserController } from "../controller";

import { verifyToken } from "../../auth/controller"

routes.route("/user").post(
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            password: Joi.string().required(),
            type_user: Joi.number().required(),
        }),
    }),
    UserController().CreateUser
);

routes.route("/user").get(verifyToken, UserController().getAllUsers);

routes.route("/user/:id").get(
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required(),
        }),
    }),
    verifyToken,
    UserController().getUserById
)

routes.route("/user/:id").put(
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            password: Joi.string().required(),
            type_user: Joi.number().required(),
        }),
    }),
    verifyToken,
    UserController().updateUser
)

routes.route("/user/:id").delete(
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
      }),
    }),
    verifyToken,
    UserController().deleteUser
  );

  export default routes;
