import express from "express";

import connection from "./db/config";

import usersRoutes from "./Modules/Users/routes/users.routes";
import authRoutes from "./Modules/auth/routes/auth.routes";
// import { errors } from 'celebrate';

const app = express();
// app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(errors());
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(usersRoutes);
app.use(authRoutes);


app.listen(3000, () => {
  console.log("Server started on port 3000");
});