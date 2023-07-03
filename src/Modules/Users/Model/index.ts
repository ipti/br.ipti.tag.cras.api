
import Sequelize from "sequelize";

import database from "../../../db/config";
import bcrypt from "bcrypt";

const User = database.define("user", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull:false,
        unique: true,
    },
    type_user: Sequelize.INTEGER,
},
{
    freezeTableName: true,
    instanceMethods: {
        generateHash(password: string) {
            return bcrypt.hash(password, bcrypt.genSaltSync(8));
        },
        validPassword(password) {
            return bcrypt.compare(password, this.password);
        }
    }})

export default User;