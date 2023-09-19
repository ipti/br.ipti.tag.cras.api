import express from "express";
import cors from "cors";

import DbConnection, { sequelize } from "./db/config";

import usersRoutes from "./Modules/Users/routes/users.routes";
import authRoutes from "./Modules/auth/routes/auth.routes";
import customServices from "./Modules/customServices/routes/customservices.routes";
import userIdentify from "./Modules/userIdentify/routes/userIdentify.routes";
import technician from "./Modules/technician/routes/technician.routes";
import typesServices from "./Modules/typeServices/routes/typesServices.routes";
import familyMemberRoutes from "./Modules/familyMember/routes/familyMember.routes";


import { servico } from "./Modules/typeServices/model/typeServices.model";
import { tecnico } from "./Modules/technician/model/technician.model";
import { control_attendance } from "./Modules/userIdentify/model/controlAttendance.model";
import { atendimentos } from "./Modules/customServices/model/customservices.model";
import { membro_familiar } from "./Modules/familyMember/model/familyMember.model";
import { situacao_financeira } from "./Modules/userIdentify/model/financialsSituation.model";
import { vulnerabilidade } from "./Modules/userIdentify/model/vulnerability.model";
import { identificacao_usuario } from "./Modules/userIdentify/model/userIdentify.model";
import { endereco } from "./Modules/userIdentify/model/address.model";
import { exit } from "process";
import { errors } from "celebrate";

console.error(process.env.dbName);



const connection = DbConnection.getInstance().getConnection();

const app = express();
app.use(cors());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// app.use(errors());
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(usersRoutes);
app.use(authRoutes);
app.use(customServices);
app.use(userIdentify);
app.use(technician);
app.use(typesServices);
app.use(familyMemberRoutes);
app.use(errors());


servico.initModel(connection);
tecnico.initModel(connection);
control_attendance.initModel(connection);
atendimentos.initModel(connection);
membro_familiar.initModel(connection);
situacao_financeira.initModel(connection);
vulnerabilidade.initModel(connection);
identificacao_usuario.initModel(connection);
endereco.initModel(connection);

sequelize
  .sync()
  .then(() => {
    console.log("Database successfully connected");
  })
  .catch((err: any) => {
    console.log("Error", err);
  });

app.listen(3000, () => {
  console.log("Server started on port 3000");
});