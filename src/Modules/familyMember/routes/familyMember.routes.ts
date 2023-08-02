const routes = require("express").Router();

import { celebrate, Joi, Segments } from "celebrate";

import ChangeDatabaseConnection from "../../../middlewares/changeDatabaseConnection";
import { verifyToken } from "../../auth/controller/auth.controller";
import { FamilyMemberController } from "../controller/familyMember.controller";

routes.route("/familymember").post(
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            id_identificacao_usuario: Joi.number().required(),
            nome: Joi.string().required(),
            parentesco: Joi.string().required(),
            idade: Joi.number().required(),
            sexo: Joi.string().required(),
            nis: Joi.number().integer(),
            loas: Joi.number().integer(),
            bolsaFamilia: Joi.number().integer(),
            previdencia: Joi.number().integer(),
            renda: Joi.number(),
        }),
    }),
    ChangeDatabaseConnection.changeDatabase,
    verifyToken,
    FamilyMemberController().CreateFamilyMember
);

routes.route("/familymember").get(ChangeDatabaseConnection.changeDatabase, verifyToken, FamilyMemberController().getAllFamilyMember);

routes.route("/familymember/:id").get(
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id_identificacao_usuario: Joi.number().integer().positive(),
            nome: Joi.string(),
            parentesco: Joi.string(),
            idade: Joi.number().integer().positive(),
            sexo: Joi.string(),
            nis: Joi.number().integer().positive(),
            loas: Joi.number().integer().positive(),
            bolsaFamilia: Joi.number().integer().positive(),
            previdencia: Joi.number().integer().positive(),
            renda: Joi.number().positive(),
        }),
    }),
    ChangeDatabaseConnection.changeDatabase,
    verifyToken,
    FamilyMemberController().getFamilyMemberById
)

routes.route("/familymember/:id").put(
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            nome: Joi.string().required(),
        }),
    }),
    ChangeDatabaseConnection.changeDatabase,
    verifyToken,
    FamilyMemberController().updateFamilyMember
)

routes.route("/familymember/:id").delete(
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required(),
        }),
    }),
    ChangeDatabaseConnection.changeDatabase,
    verifyToken,
    FamilyMemberController().deleteFamilyMember
);

export default routes;
