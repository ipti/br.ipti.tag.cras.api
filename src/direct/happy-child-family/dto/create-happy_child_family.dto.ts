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

  export class CreateFamilyOnHcDto {

    @IsOptional()
    @IsBoolean()
    canDelete?: boolean;

    @IsNotEmpty()
    @IsString()
    nis_number: string;

    @IsNotEmpty()
    @IsString()
    uf: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    neighborhood: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    cep: string;

    @IsNotEmpty()
    @IsString()
    reference: string;

    @IsNotEmpty()
    @IsEnum(Housing_area)
    area: Housing_area;

    @IsNotEmpty()
    @IsEnum(House_walls)
    house_walls: House_walls;

    @IsNotEmpty()
    @IsNumber()
    rooms_number: number;

    @IsNotEmpty()
    @IsEnum(Safe_space)
    safe_space: Safe_space;

    @IsNotEmpty()
    @IsEnum(Water_supply)
    water_supply: Water_supply;

    @IsOptional()
    @IsString()
    water_supply_other?: string;

    @IsNotEmpty()
    @IsBoolean()
    treated_water: boolean;

    @IsNotEmpty()
    @IsBoolean()
    has_bathroom: boolean;

    @IsNotEmpty()
    @IsBoolean()
    has_electricity: boolean;
   
    @IsNotEmpty()
    @IsBoolean()
    has_cellphone: boolean;

    @IsNotEmpty()
    @IsBoolean()
    has_cellphone_internet: boolean;

    @IsNotEmpty()
    @IsBoolean()
    has_refrigerator: boolean;

    @IsNotEmpty()
    @IsBoolean()
    has_gas_stove: boolean;
   
    @IsNotEmpty()
    @IsBoolean()
    has_tv: boolean;

    @IsNotEmpty()
    @IsBoolean()
    has_radio: boolean;

    @IsNotEmpty()
    @IsBoolean()
    has_newspaper: boolean;

    @IsNotEmpty()
    @IsBoolean()
    has_computer: boolean;

    @IsNotEmpty()
    @IsBoolean()
    has_computer_internet: boolean;
   
    @IsNotEmpty()
    @IsBoolean()
    has_other_eletronics: boolean;

    @IsOptional()
    @IsString()
    other_eletronics?: string;

    @IsNotEmpty()
    @IsBoolean()
    has_car: boolean;
   
    @IsNotEmpty()
    @IsBoolean()
    has_motorcycle: boolean;
   
    @IsNotEmpty()
    @IsBoolean()
    has_bicycle: boolean;
   
    @IsNotEmpty()
    @IsBoolean()
    has_public_transport: boolean;
   
    @IsNotEmpty()
    @IsBoolean()
    has_other_transport: boolean;

    @IsOptional()
    @IsString()
    other_transport?: string;
   
    @IsNotEmpty()
    @IsBoolean()
    social_benefits: boolean;

    @IsOptional()
    @IsString()
    social_benefits_which?: string;

    @IsNotEmpty()
    @IsNumber()
    residents_number: number;
   
    @IsNotEmpty()
    @IsBoolean()
    family_speaks_other_lang: boolean;

    @IsOptional()
    @IsString()
    family_speaks_other_lang_which?: string;

    @IsNotEmpty()
    @IsEnum(Kinship)
    family_head: Kinship;

    @IsNotEmpty()
    @IsString()
    family_head_phone_number: string;

    @IsOptional()
    @IsString()
    family_head_ocupation?: string;

    @IsNotEmpty()
    @IsBoolean()
    family_contribution: boolean;

    @IsOptional()
    @IsString()
    family_contribution_who?: string;

    @IsNotEmpty()
    @IsBoolean()
    residents_0_3: boolean;
  
    @IsNotEmpty()
    @IsBoolean()
    residents_4_6: boolean;
   
    @IsNotEmpty()
    @IsBoolean()
    residents_7_12: boolean;
   
    @IsNotEmpty()
    @IsBoolean()
    residents_13_18: boolean;

    @IsNotEmpty()
    @IsBoolean()
    residents_19_59: boolean;

    @IsNotEmpty()
    @IsBoolean()
    residents_60_more: boolean;

    @IsOptional()
    @IsNumber()
    residents_0_3_number?: number;

    @IsOptional()
    @IsNumber()
    residents_4_6_number?: number;

    @IsOptional()
    @IsBoolean()
    residents_childrens_served?: boolean;

    @IsNotEmpty()
    @IsBoolean()
    people_with_disabilities: boolean;

    @IsNotEmpty()
    @IsBoolean()
    alcool_abuse: boolean;

    @IsNotEmpty()
    @IsBoolean()
    drug_abuse: boolean;

    @IsNotEmpty()
    @IsBoolean()
    unemployed: boolean;

    @IsNotEmpty()
    @IsBoolean()
    inmate: boolean;

    @IsNotEmpty()
    @IsBoolean()
    inmate_open_regime: boolean;

    @IsNotEmpty()
    @IsBoolean()
    inmate_socio_edu_measures: boolean;

    @IsNotEmpty()
    @IsBoolean()
    mother_with_deceased_child: boolean;

    @IsNotEmpty()
    @IsBoolean()
    mother_with_stillbirth: boolean;

    @IsNotEmpty()
    @IsBoolean()
    domestic_animals: boolean;

    @IsOptional()
    @IsNumber()
    number_of_cats?: number;

    @IsOptional()
    @IsNumber()
    number_of_dogs?: number;

    @IsOptional()
    @IsNumber()
    number_of_birds?: number;

    @IsOptional()
    @IsString()
    other_animals?: string;

    @IsNotEmpty()
    @IsString()
    primary_caregiver_of_children: string;

    @IsNotEmpty()
    @IsBoolean()
    has_pregnant: boolean;

    @IsNotEmpty()
    @IsEnum(Day_period)
    best_visit_period: Day_period;

    @IsNotEmpty()
    @IsEnum(Days_of_week)
    best_visit_day: Days_of_week;

    @IsNotEmpty()
    @IsEnum(Relatives_in_city)
    relatives_in_the_city: Relatives_in_city;

    @IsNotEmpty()
    @IsBoolean()
    family_participation_in_community: boolean;

    @IsNotEmpty()
    @IsEnum(Religions)
    family_religion: Religions;

    @IsOptional()
    @IsString()
    family_religion_other?: string;

    @IsOptional()
    @IsString()
    expectation_pcf?: string;

    @IsNotEmpty()
    @IsEnum(Family_health_care)
    family_health_care: Family_health_care;

    @IsNotEmpty()
    @IsBoolean()
    family_esf_attendance: boolean;

    @IsOptional()
    @IsString()
    family_esf_attendance_which?: string;

    @IsNotEmpty()
    @IsBoolean()
    family_health_agent_visit: boolean;

    @IsOptional()
    @IsString()
    family_health_agent_visit_which?: string;

    @IsNotEmpty()
    @IsEnum(Services_accompanying_family)
    services_accompanying_family: Services_accompanying_family;

    @IsNotEmpty()
    @IsEnum(Reception_method)
    initial_reception_method_pcf: Reception_method;

    @IsNotEmpty()
    @IsNumber()
    attendance_unity: number;

    @IsNotEmpty()
    @IsNumber()
    attendance_unity_fk: number;
}
