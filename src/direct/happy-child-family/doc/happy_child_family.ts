import { 
    Housing_area,
    House_walls,
    Safe_space,
    Water_supply,
    Kinship,
    Day_period,
    Days_of_week,
    Relatives_in_city,
    Religions,
    Family_health_care,
    Services_accompanying_family,
    Reception_method 
} from '@prisma/client';
import {
    IsBoolean,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class HappyChildFamilyDocument {
    @ApiPropertyOptional({ type: Boolean })
    canDelete?: boolean;

    @ApiProperty({ type: String })
    nis_number: string;

    @ApiProperty({ type: String })
    uf: string;

    @ApiProperty({ type: String })
    city: string;

    @ApiProperty({ type: String })
    neighborhood: string;

    @ApiProperty({ type: String })
    address: string;

    @ApiProperty({ type: String })
    cep: string;

    @ApiProperty({ type: String })
    reference: string;

    @ApiProperty({ enum: Housing_area })
    @IsEnum(Housing_area)
    area: Housing_area;

    @ApiProperty({ enum: House_walls })
    @IsEnum(House_walls)
    house_walls: House_walls;

    @ApiProperty({ type: Number })
    @IsNumber()
    rooms_number: number;

    @ApiProperty({ enum: Safe_space })
    @IsEnum(Safe_space)
    safe_space: Safe_space;

    @ApiProperty({ enum: Water_supply })
    @IsEnum(Water_supply)
    water_supply: Water_supply;

    @ApiPropertyOptional({ type: String })
    water_supply_other?: string;

    @ApiProperty({ type: Boolean })
    treated_water: boolean;

    @ApiProperty({ type: Boolean })
    has_bathroom: boolean;

    @ApiProperty({ type: Boolean })
    has_electricity: boolean;

    @ApiProperty({ type: Boolean })
    has_cellphone: boolean;

    @ApiProperty({ type: Boolean })
    has_cellphone_internet: boolean;

    @ApiProperty({ type: Boolean })
    has_refrigerator: boolean;

    @ApiProperty({ type: Boolean })
    has_gas_stove: boolean;

    @ApiProperty({ type: Boolean })
    has_tv: boolean;

    @ApiProperty({ type: Boolean })
    has_radio: boolean;

    @ApiProperty({ type: Boolean })
    has_newspaper: boolean;

    @ApiProperty({ type: Boolean })
    has_computer: boolean;

    @ApiProperty({ type: Boolean })
    has_computer_internet: boolean;

    @ApiProperty({ type: Boolean })
    has_other_eletronics: boolean;

    @ApiPropertyOptional({ type: String })
    other_eletronics?: string;

    @ApiProperty({ type: Boolean })
    has_car: boolean;

    @ApiProperty({ type: Boolean })
    has_motorcycle: boolean;

    @ApiProperty({ type: Boolean })
    has_bicycle: boolean;

    @ApiProperty({ type: Boolean })
    has_public_transport: boolean;

    @ApiProperty({ type: Boolean })
    has_other_transport: boolean;

    @ApiPropertyOptional({ type: String })
    other_transport?: string;

    @ApiProperty({ type: Boolean })
    social_benefits: boolean;

    @ApiPropertyOptional({ type: String })
    social_benefits_which?: string;

    @ApiProperty({ type: Number })
    @IsNumber()
    residents_number: number;

    @ApiProperty({ type: Boolean })
    family_speaks_other_lang: boolean;

    @ApiPropertyOptional({ type: String })
    family_speaks_other_lang_which?: string;

    @ApiProperty({ enum: Kinship })
    @IsEnum(Kinship)
    family_head: Kinship;

    @ApiProperty({ type: String })
    family_head_phone_number: string;

    @ApiPropertyOptional({ type: String })
    family_head_ocupation?: string;

    @ApiProperty({ type: Boolean })
    family_contribution: boolean;

    @ApiPropertyOptional({ type: String })
    family_contribution_who?: string;

    @ApiProperty({ type: Boolean })
    residents_0_3: boolean;

    @ApiProperty({ type: Boolean })
    residents_4_6: boolean;

    @ApiProperty({ type: Boolean })
    residents_7_12: boolean;

    @ApiProperty({ type: Boolean })
    residents_13_18: boolean;

    @ApiProperty({ type: Boolean })
    residents_19_59: boolean;

    @ApiProperty({ type: Boolean })
    residents_60_more: boolean;

    @ApiPropertyOptional({ type: Number })
    @IsNumber()
    residents_0_3_number?: number;

    @ApiPropertyOptional({ type: Number })
    @IsNumber()
    residents_4_6_number?: number;

    @ApiPropertyOptional({ type: Boolean })
    residents_childrens_served?: boolean;

    @ApiProperty({ type: Boolean })
    people_with_disabilities: boolean;

    @ApiProperty({ type: Boolean })
    alcool_abuse: boolean;

    @ApiProperty({ type: Boolean })
    drug_abuse: boolean;

    @ApiProperty({ type: Boolean })
    unemployed: boolean;

    @ApiProperty({ type: Boolean })
    inmate: boolean;

    @ApiProperty({ type: Boolean })
    inmate_open_regime: boolean;

    @ApiProperty({ type: Boolean })
    inmate_socio_edu_measures: boolean;

    @ApiProperty({ type: Boolean })
    mother_with_deceased_child: boolean;

    @ApiProperty({ type: Boolean })
    mother_with_stillbirth: boolean;

    @ApiProperty({ type: Boolean })
    domestic_animals: boolean;

    @ApiPropertyOptional({ type: Number })
    number_of_cats?: number;

    @ApiPropertyOptional({ type: Number })
    number_of_dogs?: number;

    @ApiPropertyOptional({ type: Number })
    number_of_birds?: number;

    @ApiPropertyOptional({ type: String })
    other_animals?: string;

    @ApiProperty({ type: String })
    primary_caregiver_of_children: string;

    @ApiProperty({ type: Boolean })
    has_pregnant: boolean;

    @ApiProperty({ enum: Day_period })
    best_visit_period: Day_period;

    @ApiProperty({ enum: Days_of_week })
    best_visit_day: Days_of_week;

    @ApiProperty({ enum: Relatives_in_city })
    relatives_in_the_city: Relatives_in_city;

    @ApiProperty({ type: Boolean })
    family_participation_in_community: boolean;

    @ApiProperty({ enum: Religions })
    @IsEnum(Religions)
    family_religion: Religions;

    @ApiPropertyOptional({ type: String })
    family_religion_other?: string;

    @ApiPropertyOptional({ type: String })
    expectation_pcf?: string;

    @ApiProperty({ enum: Family_health_care })
    family_health_care: Family_health_care;

    @ApiProperty({ type: Boolean })
    family_esf_attendance: boolean;

    @ApiPropertyOptional({ type: String })
    family_esf_attendance_which?: string;

    @ApiProperty({ type: Boolean })
    family_health_agent_visit: boolean;

    @ApiPropertyOptional({ type: String })
    family_health_agent_visit_which?: string;

    @ApiProperty({ enum: Services_accompanying_family })
    services_accompanying_family: Services_accompanying_family;

    @ApiProperty({ enum: Reception_method })
    initial_reception_method_pcf: Reception_method;

    @ApiProperty({ type: Number })
    attendance_unity: number;

    @ApiProperty({ type: Number })
    attendance_unity_fk: number;
}