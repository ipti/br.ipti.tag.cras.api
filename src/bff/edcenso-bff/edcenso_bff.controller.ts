import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EdcensoBffService } from './service/edcenso_bff.service';
import { JwtAuthGuard } from '../../auth/shared/jwt-auth.guard';
import { edcenso_city } from '@prisma/client';
import { Request } from 'express';

@ApiTags('EdcensoBff')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller()
export class EdcensoBffController {
  constructor(private readonly edcensoBffService: EdcensoBffService) { }

  @Get('city')
  @ApiOkResponse({ description: 'Retorna cidade por ID' })
  async getEdcensoCity(@Query('edcenso_city_fk') edcenso_city_fk: string): Promise<edcenso_city> {
    return this.edcensoBffService.getEdcensoCityById(edcenso_city_fk);
  }

  @Get('uf')
  @ApiOkResponse({ description: 'Retorna todos os estados (UF)' })
  async getAllUf() {
    return this.edcensoBffService.getAllUf();
  }

  @Get('cities-by-uf')
  @ApiOkResponse({ description: 'Retorna cidades filtradas por UF' })
  async getCitiesByUf(@Query('uf_fk') uf_fk: string) {
    return this.edcensoBffService.getCitiesByUf(uf_fk);
  }
}
