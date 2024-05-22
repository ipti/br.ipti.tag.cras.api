import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFamilyOnHcDto } from '../dto/create-happy_child_family.dto'
import { UpdateFamilyOnHcDto } from '../dto/update-happy_child_family.dto'
import { PrismaService } from 'src/prisma/prisma.service';
import { family_on_hc } from '@prisma/client';
import { Request } from 'express';


@Injectable()
export class FamilyBenefitsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createFamilyOnHcDto: CreateFamilyOnHcDto): Promise<family_on_hc> {
    const family_on_hc = await this.prismaService.family_on_hc.create({
      data: {
        canDelete: createFamilyOnHcDto.canDelete ?? true,
        nis_number: createFamilyOnHcDto.nis_number,
        uf: createFamilyOnHcDto.uf,
        city: createFamilyOnHcDto.city,
        neighborhood: createFamilyOnHcDto.neighborhood,
        ...createFamilyOnHcDto,
      },
        });
        return family_on_hc;
    }

    async findAll(request: Request): Promise<family_on_hc[]> {
        return this.prismaService.family_on_hc.findMany();
    }

    async findOne(id: number): Promise<family_on_hc> {
        const family_on_hc = await this.prismaService.family_on_hc.findUnique({
          where: { id },
        });
        
        if (!family_on_hc) {
          throw new NotFoundException(`FamilyOnHc with ID ${id} not found`);
        }
        
        return family_on_hc;
    }

    async update(request: Request, id: string, updateFamilyOnHcDto: UpdateFamilyOnHcDto): Promise<family_on_hc> {
        const { family_id, happy_child_id } = updateFamilyOnHcDto;
        const family_on_hc = await this.prismaService.family_on_hc.update({
            where: {
                id: id,
            },
            data: {
                family_id,
                happy_child_id,
            },
        });
        return family_on_hc;
    }  
   
}
