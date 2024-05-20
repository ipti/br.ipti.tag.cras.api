import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateHappyChildFamilyDto } from '../dto/create-happy_child_family.dto'
import { UpdateHappyChildFamilyDto } from '../dto/update-happy_child_family.dto'
import { PrismaService } from 'src/prisma/prisma.service';
import { family_on_hc } from '@prisma/client';
import { Request } from 'express';


@Injectable()
export class FamilyBenefitsService {
  constructor(private readonly prismaService: PrismaService) {}

    async create(request: Request, createHappyChildFamilyDto: CreateHappyChildFamilyDto): Promise<family_on_hc> {
        const { family_id, happy_child_id } = createHappyChildFamilyDto;
        const family_on_hc = await this.prismaService.family_on_hc.create({
        data: {
            family_id: family_id,
            happy_child_id: happy_child_id,
        },
        });
        return family_on_hc;
    }

    async findAll(request: Request): Promise<family_on_hc[]> {
        return this.prismaService.family_on_hc.findMany();
    }

    async findOne(request: Request, id: string): Promise<family_on_hc> {
        const family_on_hc = await this.prismaService.family_on_hc.findUnique({
        where: {
            id: id,
        },
        });
        if (!family_on_hc) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return family_on_hc;
    }

    async update(request: Request, id: string, updateHappyChildFamilyDto: UpdateHappyChildFamilyDto): Promise<family_on_hc> {
        const { family_id, happy_child_id } = updateHappyChildFamilyDto;
        const family_on_hc = await this.prismaService.family_on_hc.update({
        where: {
            id: id,
        },
        data: {
            family_id: family_id
            happy_child_id: happy_child_id
        },

        });

        return family_on_hc;
    }        
   
}
