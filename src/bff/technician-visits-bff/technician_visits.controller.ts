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
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TechnicianVisitsBffService } from './service/technician_visits.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';
import { CreateTechnicianVisitsDto } from './dto/create-technician_visits.dto';

@ApiTags('TechnicianVisitsBff')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller()
export class TechnicianVisitsBffController {
  constructor(
    private readonly TechnicianVisitsBffService: TechnicianVisitsBffService,
  ) {}

  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        family: {
          type: 'number',
        },
        created_at: {
          type: 'string',
          format: 'date-time',
        },
      },
    },
  })
  createTechnicianVisits(
    @Req() request: Request,
    @Body() technicianVisitsCreate: CreateTechnicianVisitsDto,
  ) {
    return this.TechnicianVisitsBffService.createTechnicianVisits(
      request.user,
      technicianVisitsCreate,
    );
  }

  @Get()
  getTechnicianVisitss(@Req() request: Request) {
    return this.TechnicianVisitsBffService.getTechnicianVisits(request.user);
  }
}
