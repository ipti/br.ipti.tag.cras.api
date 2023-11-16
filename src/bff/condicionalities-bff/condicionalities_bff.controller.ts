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
import { CondicionalitiesBffService } from './service/condicionalities_bff.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';
import { CreateCondicionalitiesBffDto } from './dto/create-condicionalities_bff.dto';

@ApiTags('CondicionalitiesBff')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller()
export class CondicionalitiesBffController {
  constructor(
    private readonly CondicionalitiesBffService: CondicionalitiesBffService,
  ) {}

  @Post()
  @ApiCreatedResponse({ description: 'Criar condicionalities_bff' })
  async create(
    @Req() req: Request,
    @Body() body: CreateCondicionalitiesBffDto,
  ) {
    return await this.CondicionalitiesBffService.createForFamily(
      req.user,
      body,
    );
  }
}
