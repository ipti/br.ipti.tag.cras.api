
import DbConnection, { sequelize } from "../../../db/config";
import { makeErrorMessage } from "../../../util/error.services";
import { ErrorType } from "../../../util/error.type";
import { endereco } from "../../address/model/address.model";
import { situacao_financeira } from "../../financialSituation/model/financialsSituation.model";
import { vulnerabilidade } from "../../vulnerability/model/vulnerability.model";
import { identificacao_usuario } from "../model/userIdentify.model";

interface IdendifyAttributs {
    id_endereco: number;
    id_situacao_financeira: number;
    id_vulnerabilidade: number;
    nome: string;
    apelido: string;
    data_nascimento?: string;
    pasta?: string;
    arquivo?: string;
    nº?: string;
    certidao_nascimento?: number;
    NIS?: number;
    numero_rg?: string;
    data_emissao_rg?: string;
    uf_rg?: string;
    emissao_rg?: string;
    cpf: string;
    deficiente: string;
    deficiencia: string;
    mae: string;
    pai: string;
    estado_civil: string;
    escolaridade: string;
    data_inicial: string;
    data_final?: string;
    ocupacao_irregular: number;
    crianca_sozinha: number;
    idosos_dependentes: number;
    desempregados: number;
    deficientes: number;
    baixa_renda: number;
    outros: number;
    profissao: string;
    renda: number;
    reside_familia: string;
    bolsa_familia: number;
    loasbpc: number;
    previdencia: number;
    carteira_assinada: string;
    id_identificacao_usuario: number;
    parentesco: string;
    idade: number;
    sexo: string;
    nis: number;
    loas: number;
    bolsaFamilia: number;
    endereco: string;
    telefone: string;
    ponto_referencia: string;
    condicoes_moradia: string;
    tipo_construcao: string;
    comodos: string;
    valor_aluguel: number;
}

export const UserIdentifyServices = () => {

    const connection = DbConnection.getInstance().getConnection();

    const validUserIdentifyToCreate = async (body: IdendifyAttributs) => {

        // console.log(connection)
        const validUser = await getUserIdentifyByUserEmail(body.cpf);

        if (validUser) {
            const error: ErrorType = makeErrorMessage(
                "Username already exists",
                409
            );
            throw error;
        }

        try {

            const result = await sequelize.transaction(async (t) => {

                const address = await endereco.create({
                    endereco: body.endereco,
                    telefone: body.telefone,
                    ponto_referencia: body.ponto_referencia,
                    condicoes_moradia: body.condicoes_moradia,
                    tipo_construcao: body.tipo_construcao,
                    comodos: body.comodos,
                    valor_aluguel: body.valor_aluguel,
                }, { transaction: t })

                const financialSituation = await situacao_financeira.create({
                    profissao: body.profissao,
                    renda: body.renda,
                    reside_familia: body.reside_familia,
                    bolsa_familia: body.bolsa_familia,
                    loasbpc: body.loasbpc,
                    previdencia: body.previdencia,
                    carteira_assinada: body.carteira_assinada,
                }, { transaction: t })

                const vulnerability = await vulnerabilidade.create({
                    ocupacao_irregular: body.ocupacao_irregular,
                    crianca_sozinha: body.crianca_sozinha,
                    idosos_dependentes: body.idosos_dependentes,
                    desempregados: body.desempregados,
                    deficientes: body.deficientes,
                    baixa_renda: body.baixa_renda,
                    outros: body.outros,
                }, { transaction: t })

                const userIdentify = await identificacao_usuario.create({
                    id_endereco: address.id,
                    id_situacao_financeira: financialSituation.id,
                    id_vulnerabilidade: vulnerability.id,
                    pasta: body.pasta,
                    arquivo: body.arquivo,
                    nº: body.nº,
                    nome: body.nome,
                    apelido: body.apelido,
                    data_nascimento: body.data_nascimento,
                    certidao_nascimento: body.certidao_nascimento,
                    NIS: body.NIS,
                    numero_rg: body.numero_rg,
                    data_emissao_rg: body.data_emissao_rg,
                    uf_rg: body.uf_rg,
                    emissao_rg: body.emissao_rg,
                    cpf: body.cpf,
                    deficiente: body.deficiente,
                    deficiencia: body.deficiencia,
                    mae: body.mae,
                    pai: body.pai,
                    estado_civil: body.estado_civil,
                    escolaridade: body.escolaridade,
                    data_inicial: body.data_inicial,
                    data_final: body.data_final,
                }, { transaction: t });



                return { userIdentify, vulnerability };

            });

            // If the execution reaches this line, the transaction has been committed successfully
            // `result` is whatever was returned from the transaction callback (the `user`, in this case)

        } catch (error) {

            // If the execution reaches this line, an error occurred.
            // The transaction has already been rolled back automatically by Sequelize!

        }
        // return result;
    }

    const getUserIdentifyByUserEmail = async (cpf: string) => {
        const idusuario: any = await identificacao_usuario.findOne({ where: { cpf } });
        return idusuario;
    };



    const getUserIdentifyById = async (id: string) => {
        const user: any = await identificacao_usuario.findByPk(id, {
            include:
                [vulnerabilidade, endereco, situacao_financeira]
        });
        if (!user) {
            const error: ErrorType = makeErrorMessage(
                "User not found",
                404
            );
            throw error;
        }


        return user;
    };

    const getAllUserIdentify = async () => {
        const allUsers: any[] = await identificacao_usuario.findAll({
            include:
                [vulnerabilidade, endereco, situacao_financeira]
        });
        if (allUsers.length === 0) {
            const error: ErrorType = makeErrorMessage(
                "No users found",
                404
            );
            throw error;
        }
        return allUsers;
    };

    const updateUserIdentify = async (id: string, body: IdendifyAttributs) => {
        await getUserIdentifyById(id);
        await identificacao_usuario.update({ ...body }, { where: { id } });
        const updatedUser: IdendifyAttributs | null = await getUserIdentifyById(id);
        return updatedUser;
    };



    const deleteUserIdentify = async (id: string) => {
        const deletedUser: any = await identificacao_usuario.findByPk(id);
        await identificacao_usuario.destroy({ where: { id } });
        return deletedUser;
    };

    return {
        validUserIdentifyToCreate, getAllUserIdentify, updateUserIdentify, deleteUserIdentify, getUserIdentifyById, getUserIdentifyByUserEmail
    }
}
