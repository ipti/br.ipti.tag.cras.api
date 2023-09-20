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
      const services = await connection.query(
        "SELECT id, nome, qtd_atendimentos, total FROM `cras-db`.resumo_atendimentos;",
        { type: sequelize.QueryTypes.SELECT }
      );

      return services;
    } catch (error) {
      const err: ErrorType = makeErrorMessage(`${error}`, 500);
      throw err;
    }
  };

  return {
    servicesResume,
  };
};
