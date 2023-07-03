const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    "cras-db",
    "root",
    "",
    {
        host: "localhost",
        dialect: 'mariadb',
        port: 3306
    }
);

export default sequelize;