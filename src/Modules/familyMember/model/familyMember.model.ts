import bcrypt from 'bcryptjs';
import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { sequelize } from '../../../db/config';


export interface FamilyMemberAttributes {
    id: number;
    name: string;
    age: number;
    nis: string;
    sex: number;
    kinship: string;
    loas_bpc: string;
    family_scholarship: string;
    social_security: string;
    monthly_income: string;
}

export interface FamilyMemberInput extends Optional<FamilyMemberAttributes, "id"> { }
export interface FamilyMemberOuput extends Required<FamilyMemberAttributes> { }

class FamilyMember extends Model<FamilyMemberAttributes, FamilyMemberInput> implements FamilyMemberAttributes {
    id!: number;
    name!: string;
    age!: number;
    nis!: string;
    sex!: number;
    kinship!: string;
    loas_bpc!: string;
    family_scholarship!: string;
    social_security!: string;
    monthly_income!: string; 
}

FamilyMember.init(
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
        tableName: "family_member",
        timestamps: true,
        paranoid: true,
        createdAt: true,
        updatedAt: 'updateTimestamp'
    }
);









export default FamilyMember;