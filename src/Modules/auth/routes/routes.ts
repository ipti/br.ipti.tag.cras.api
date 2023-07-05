const routes = require("express").Router();
import { celebrate, Joi, Segments } from "celebrate";
import { login } from "../controller/index";

routes.route("/auth/login").post(
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login
);

export default routes;