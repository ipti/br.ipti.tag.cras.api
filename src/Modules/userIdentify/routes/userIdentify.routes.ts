const routes = require("express").Router();

import { celebrate, Joi, Segments } from "celebrate";

import ChangeDatabaseConnection from "../../../middlewares/changeDatabaseConnection";
import { UserIdentifyController } from "../controller/userIdentify.controller";
import { verifyToken } from "../../auth/controller/auth.controller";

routes.route("/userIdentify").post(
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            nome: Joi.string(),
            apelido: Joi.string(),
            data_nascimento: Joi.string(),
            certidao_nascimento: Joi.number(),
            pasta: Joi.string(),
            arquivo: Joi.string(),
            "nº": Joi.string(),
            NIS: Joi.number(),
            numero_rg: Joi.string(),
            data_emissao_rg: Joi.string(),
            uf_rg: Joi.string(),
            emissao_rg: Joi.string(),
            cpf: Joi.string(),
            deficiente: Joi.string(),
            deficiencia: Joi.string(),
            mae: Joi.string(),
            pai: Joi.string(),
            estado_civil: Joi.string(),
            escolaridade: Joi.string(),
            data_inicial: Joi.string(),
            data_final: Joi.string(),
            endereco: Joi.string(),
            telefone: Joi.string(),
            ponto_referencia: Joi.string(),
            condicoes_moradia: Joi.string(),
            tipo_construcao: Joi.string(),
            comodos: Joi.string(),
            valor_aluguel: Joi.number(),
            profissao: Joi.string(),
            renda: Joi.number(),
            reside_familia: Joi.string(),
            bolsa_familia: Joi.number(),
            loasbpc: Joi.number(),
            previdencia: Joi.number(),
            carteira_assinada: Joi.string(),
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
    UserIdentifyController().CreateUserIdentify
);

routes.route("/userIdentify").get(ChangeDatabaseConnection.changeDatabase, UserIdentifyController().getAllUserIdentify);

routes.route("/userIdentify/:id").get(
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required(),
        }),
    }),
    ChangeDatabaseConnection.changeDatabase,
    UserIdentifyController().getUserIdentifyById
)

routes.route("/userIdentify/:id").put(
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            nome: Joi.string().required(),
            apelido: Joi.string().required(),
            data_nascimento: Joi.string().required(),
            certidao_nascimento: Joi.number(),
            NIS: Joi.string(),
            numero_rg: Joi.string().required(),
            data_emissao_rg: Joi.string().required(),
            uf_rg: Joi.string().required(),
            emissao_rg: Joi.string().required(),
            cpf: Joi.string().required(),
            deficiente: Joi.string().required(),
            deficiencia: Joi.string().required(),
            mae: Joi.string().required(),
            pai: Joi.string().required(),
            estado_civil: Joi.string().required(),
            escolaridade: Joi.string().required(),
            data_inicial: Joi.string().required(),
            data_final: Joi.string().required(),
            ocupacao_irregular: Joi.number(),
            crianca_sozinha: Joi.number().required(),
            idosos_dependentes: Joi.number().required(),
            desempregados: Joi.number().required(),
            deficientes: Joi.number().required(),
            baixa_renda: Joi.number().required(),
            outros: Joi.number().required(),
            profissao: Joi.string().required(),
            renda: Joi.number(),
            reside_familia: Joi.string().required(),
            bolsa_familia: Joi.number(),
            loasbpc: Joi.number(),
            previdencia: Joi.number(),
            carteira_assinada: Joi.string().required(),
            id_identificacao_usuario: Joi.number(),
            parentesco: Joi.string().required(),
            idade: Joi.number(),
            sexo: Joi.string().required(),
            nis: Joi.number(),
            loas: Joi.number(),
            bolsaFamilia: Joi.number(),
            endereco: Joi.string().required(),
            telefone: Joi.string().required(),
            ponto_referencia: Joi.string().required(),
            condicoes_moradia: Joi.string().required(),
            tipo_construcao: Joi.string().required(),
            comodos: Joi.string().required(),
            valor_aluguel: Joi.number(),
        }),
    }),
    ChangeDatabaseConnection.changeDatabase,
    UserIdentifyController().updateUserIdentify
)

routes.route("/userIdentify/:id").delete(
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required(),
        }),
    }),
    ChangeDatabaseConnection.changeDatabase,
    UserIdentifyController().deleteUserIdentify
);

export default routes;
