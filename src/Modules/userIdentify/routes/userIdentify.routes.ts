const routes = require("express").Router();

import { celebrate, Joi, Segments } from "celebrate";

import ChangeDatabaseConnection from "../../../middlewares/changeDatabaseConnection";
import { UserIdentifyController } from "../controller/userIdentify.controller";
import { verifyToken } from "../../auth/controller/auth.controller";

routes.route("/userIdentify").post(
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            nome: Joi.string().required(),
            apelido: Joi.string().required(),
            data_nascimento: Joi.string().required(),
            certidao_nascimento: Joi.number().allow(null, ""),
            pasta: Joi.string().allow(null, ""),
            arquivo: Joi.string().allow(null, ""),
            nº: Joi.string().allow(null, ""),
            NIS: Joi.number().allow(null, ""),
            numero_rg: Joi.string().required(),
            data_emissao_rg: Joi.string().required(),
            uf_rg: Joi.string().required(),
            emissao_rg: Joi.string().required(),
            cpf: Joi.string().required(),
            deficiente: Joi.string().required(),
            deficiencia: Joi.string().empty(''),
            mae: Joi.string().required(),
            pai: Joi.string().required(),
            estado_civil: Joi.string().allow(null, ""),
            escolaridade: Joi.string().required(),
            data_inicial: Joi.string().allow(null, ""),
            data_final: Joi.string().allow(null, ""),
            endereco: Joi.string().required(),
            telefone: Joi.string().required(),
            ponto_referencia: Joi.string().allow(null, ""),
            condicoes_moradia: Joi.string().required(),
            tipo_construcao: Joi.string().required(),
            comodos: Joi.string().required(),
            valor_aluguel: Joi.number().allow(null, ""),
            profissao: Joi.string().required(),
            renda: Joi.number().allow(null, ""),
            reside_familia: Joi.string().required(),
            bolsa_familia: Joi.number().allow(null, ""),
            loasbpc: Joi.number().allow(null, ""),
            previdencia: Joi.number().allow(null, ""),
            carteira_assinada: Joi.string().allow(null, ""),
            ocupacao_irregular: Joi.number().required(),
            crianca_sozinha: Joi.number().required(),
            idosos_dependentes: Joi.number().required(),
            desempregados: Joi.number().required(),
            deficientes: Joi.number().required(),
            baixa_renda: Joi.number().required(),
            outros: Joi.number().required()
        }),
    }),
    ChangeDatabaseConnection.changeDatabase,
    verifyToken,
    UserIdentifyController().CreateUserIdentify
);

routes.route("/userIdentify").get(ChangeDatabaseConnection.changeDatabase, verifyToken,
    UserIdentifyController().getAllUserIdentify);

routes.route("/userIdentify/:id").get(
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required(),
        }),
    }),
    ChangeDatabaseConnection.changeDatabase,
    verifyToken,
    UserIdentifyController().getUserIdentifyById
)

routes.route("/userIdentify/:id").put(
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            nome: Joi.string(),
            apelido: Joi.string(),
            data_nascimento: Joi.string(),
            certidao_nascimento: Joi.number().allow(null, ""),
            pasta: Joi.string().allow(null, ""),
            arquivo: Joi.string().allow(null, ""),
            nº: Joi.string().allow(null, ""),
            NIS: Joi.number().allow(null, ""),
            numero_rg: Joi.string(),
            data_emissao_rg: Joi.string(),
            uf_rg: Joi.string(),
            emissao_rg: Joi.string(),
            cpf: Joi.string(),
            deficiente: Joi.string(),
            deficiencia: Joi.string().empty(''),
            mae: Joi.string(),
            pai: Joi.string(),
            estado_civil: Joi.string().allow(null, ""),
            escolaridade: Joi.string(),
            data_inicial: Joi.string().allow(null, ""),
            data_final: Joi.string().allow(null, ""),
            endereco: Joi.string(),
            telefone: Joi.string(),
            ponto_referencia: Joi.string().allow(null, ""),
            condicoes_moradia: Joi.string(),
            tipo_construcao: Joi.string(),
            comodos: Joi.string(),
            valor_aluguel: Joi.number().allow(null, ""),
            profissao: Joi.string(),
            renda: Joi.number().allow(null, ""),
            reside_familia: Joi.string(),
            bolsa_familia: Joi.number().allow(null, ""),
            loasbpc: Joi.number().allow(null, ""),
            previdencia: Joi.number().allow(null, ""),
            carteira_assinada: Joi.string().allow(null, ""),
            ocupacao_irregular: Joi.number(),
            crianca_sozinha: Joi.number(),
            idosos_dependentes: Joi.number(),
            desempregados: Joi.number(),
            deficientes: Joi.number(),
            baixa_renda: Joi.number(),
            outros: Joi.number()
        }),
    }),
    ChangeDatabaseConnection.changeDatabase,
    verifyToken,
    UserIdentifyController().updateUserIdentify
)

routes.route("/userIdentify/:id").delete(
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required(),
        }),
    }),
    ChangeDatabaseConnection.changeDatabase,
    verifyToken,
    UserIdentifyController().deleteUserIdentify
);

export default routes;
