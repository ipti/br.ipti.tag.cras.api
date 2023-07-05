import { Sequelize } from 'sequelize'

const dbName = "cras-db"
const dbUser = "root"
const dbHost = "localhost"
const dbPassword = ""

const sequelize = new Sequelize(
    dbName,
    dbUser,
    dbPassword ,
    {
        host: dbHost,
        dialect: 'mariadb',
        port: 3306
    }
);

export default sequelize;