import express from "express";

import { sequelize } from "./db/config";

import usersRoutes from "./Modules/Users/routes/users.routes";
import authRoutes from "./Modules/auth/routes/auth.routes";
import customServices from "./Modules/customServices/routes/customservices.routes"
// import { errors } from 'celebrate';

const app = express();
// app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(errors());
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(usersRoutes);
app.use(authRoutes);
app.use(customServices);

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