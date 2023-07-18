import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { sequelize } from "../../../db/config";
import FamilyMember from "../../familyMember/model/familyMember.model";

export interface ReferencedFamilyAttributes {
    id: number;
    folder_family: string;
    file_family: string;
    number: string;
    date_entry: Date;
    date_shutdown: Date;
    name: string;
    surname: string;
    date_birth: Date;
    registration_number: string;
    nis: string;
    rg: string;
    date_rg: Date;
    uf_rg: number;
    organ_rg: string;
    cpf: string;
    deficient: string;
    mother: string;
    father: string;
    status_civil: string;
    school_grade: number;
    result: string;
    responsible_technician: number;
    user_or_family_members: number;
    address: string;
    phone: string;
    reference_point: string;
    conditions_housing: number;
    type_construction: number;
    room_numbers: string;
    house_value: string;
    live_in_an_area_of_irregular_ocupation: Boolean;
    existence_of_dependent_elderly_in_the_family: Boolean;
    existence_of_a_disabled_person_in_the_family: Boolean;
    children_left_alone_at_home: Boolean;
    unemployment: Boolean;
    low_income: Boolean;
    others: Boolean;
    profession: string;
    signed_portfolio: Boolean;
    monthly_income: string;
    reside_with: number;
    loas_bpc: string;
    family_scholarship: string;
    social_security: string;
    member_family: Array<FamilyMember>
}

export interface ReferencedFamilyInput extends Optional<ReferencedFamilyAttributes, "id"> { }
export interface ReferencedFamilyOuput extends Required<ReferencedFamilyAttributes> { }

class ReferencedFamily extends Model<ReferencedFamilyAttributes, ReferencedFamilyInput> implements ReferencedFamilyAttributes {
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

ReferencedFamily.init(
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



export default ReferencedFamily;