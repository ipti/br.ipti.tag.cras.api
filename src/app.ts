import express from "express";

import database from "./db/config";


(async () => {
  // const database = require('./db/config');

  try {
    const resultado = await database.sync();
    console.log(resultado);
  } catch (error) {
    console.log(error);
  }
})();

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})