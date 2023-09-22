import sequelize from "sequelize";
import DbConnection from "../../../db/config";
import { makeErrorMessage } from "../../../util/error.services";
import { ErrorType } from "../../../util/error.type";
import {
  tecnico,
  tecnicoAttributes,
} from "../../technician/model/technician.model";

export const HomeCrasServices = () => {
  const connection = DbConnection.getInstance().getConnection();

  const servicesResume = async (body: tecnicoAttributes) => {
    try {

      const result = [];

      const qnt_atendimento = await connection.query(
        "SELECT id, nome as name, qtd_atendimentos as value, total FROM `cras-db`.resumo_atendimentos;",
        { type: sequelize.QueryTypes.SELECT }
      );

      // const bolsa_familia = await connection.query(
      //   `SELECT "Pessoas sem bolsa familia" as name, SUM(CASE WHEN sf.bolsa_familia = 0 THEN 1 ELSE 0 END) as valor, COUNT(*) as total
      //   FROM ${`cras-db.`}identificacao_usuario iu 
      //   JOIN ${`cras-db.`}situacao_financeira sf ON sf.id = iu.id_situacao_financeira
        
      //   UNION
        
      //   SELECT "Pessoas com bolsa familia" as name, SUM(CASE WHEN sf.bolsa_familia > 0 THEN 1 ELSE 0 END) as valor, COUNT(*) as total
      //   FROM ${`cras-db.`}identificacao_usuario iu 
      //   JOIN ${`cras-db.`}situacao_financeira sf ON sf.id = iu.id_situacao_financeira
      //   `,
      //   { type: sequelize.QueryTypes.SELECT}
      // );

      result.push({title: "Atendimentos", data: qnt_atendimento});
      // result.push({title: "Bolsa Familia", data: bolsa_familia});

      return result;
    } catch (error) {
      const err: ErrorType = makeErrorMessage(`${error}`, 500);
      throw err;
    }
  };

  return {
    servicesResume,
  };
};
