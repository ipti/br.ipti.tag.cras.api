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
  constructor(private readonly edcensoBffService: EdcensoBffService) {}

  @Get('city')
  @ApiOkResponse({ description: 'Retorna a cidade do usuário logado' })
  async getEdcensoCity(@Req() request: Request): Promise<edcenso_city> {
    return this.edcensoBffService.getEdcensoCity(request);
  }
}
