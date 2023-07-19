import bcrypt from 'bcryptjs';
import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { sequelize } from '../../../db/config';


export interface UserAttributes {
    id: number;
    email: string
    name: string;
    password: string;
    type_user: number;
}

export interface UserInput extends Optional<UserAttributes, "id"> { }
export interface UserOuput extends Required<UserAttributes> { }

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    id!: number;
    name!: string;
    email!: string;
    password!: string;
    type_user!: number;


    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public async comparePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize: sequelize,
        tableName: "users",
        timestamps: true,
        paranoid: true,
        createdAt: true,
        updatedAt: 'updateTimestamp',
        indexes: [
            {
              name: "PRIMARY",
              unique: true,
              using: "BTREE",
              fields: [
                { name: "id" },
              ]
            },
          ]
    }
);



User.beforeCreate(async (user) => {
    const hashedPassword = await bcrypt.hashSync(user.password, 10);
    user.password = hashedPassword;
});





export default User;