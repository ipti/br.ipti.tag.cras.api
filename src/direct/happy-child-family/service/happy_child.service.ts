import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFamilyOnHcDto } from '../dto/create-happy_child_family.dto'
import { UpdateFamilyOnHcDto } from '../dto/update-happy_child_family.dto'
import { PrismaService } from 'src/prisma/prisma.service';
import { family_on_hc } from '@prisma/client';
import { Request } from 'express';


@Injectable()
export class HappyChildFamilyService {
  async remove(request: any, id: string) {
    await this.prismaService.family_on_hc.delete({
      where: {
        id: +id,
      },
    });
  }

  constructor(private readonly prismaService: PrismaService) {}

  async create(createFamilyOnHcDto: CreateFamilyOnHcDto): Promise<family_on_hc> {
    const family_on_hc = await this.prismaService.family_on_hc.create({
      data: {
        canDelete: createFamilyOnHcDto.canDelete ?? true,
        ...createFamilyOnHcDto,
      },
        });
        return family_on_hc;
    }

    async findAll(request: Request): Promise<family_on_hc[]> {
        return this.prismaService.family_on_hc.findMany();
    }

    async findOne(request: any, id: number): Promise<family_on_hc> {
        const family_on_hc = await this.prismaService.family_on_hc.findUnique({
          where: { id },
        });
        
        if (!family_on_hc) {
          throw new NotFoundException(`FamilyOnHc with ID ${id} not found`);
        }
        
        return family_on_hc;
    }

    async update(request: Request, id: string, updateFamilyOnHcDto: UpdateFamilyOnHcDto): Promise<family_on_hc> {
        //const { happy_child_id } = updateFamilyOnHcDto;
        const family_on_hc = await this.prismaService.family_on_hc.update({
            where: {
                id: +id,
            },
            data: {
                ...updateFamilyOnHcDto,
            },
        });
        return family_on_hc;
    }  
   
}
