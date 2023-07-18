import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { sequelize } from "../../../db/config";

export interface CustomServicesAttributes {
    id: number;
    date_service: Date;
    service: number;
    request: string;
    arrangements: string;
    result: string;
    responsible_technician: number;
    user_or_family_members: number;
}

export interface ServicesInput extends Optional<CustomServicesAttributes, "id"> { }
export interface ServicesOuput extends Required<CustomServicesAttributes> { }

class Service extends Model<CustomServicesAttributes, ServicesInput> implements CustomServicesAttributes {
    id!: number;
    date_service!: Date;
    service!: number;
    request!: string;
    arrangements!: string;
    result!: string;
    responsible_technician!: number;
    user_or_family_members!: number;


    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

Service.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
                unique: true,
            },
            request: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            arrangements: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            result: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            service: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            responsible_technician: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            user_or_family_members: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            date_service: {
                type: DataTypes.DATE,
                allowNull: false
            }
        },
        {
            sequelize: sequelize,
            tableName: "services",
            timestamps: true,
            paranoid: true,
            createdAt: true,
            updatedAt: 'updateTimestamp'
        }
    );



export default Service;