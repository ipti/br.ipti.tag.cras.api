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
import { JwtAuthGuard } from '../auth/shared/jwt-auth.guard';
import { CreateTechnicianDto } from './dto/create-technician.dto';
import { UpdateTechnicianDto } from './dto/update-technician.dto';
import { TechnicianService } from './service/technician.service';
import { TechnicianDocument } from './doc/technician';

@ApiTags('Technician')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller('technician')
export class TechnicianController {
  constructor(private readonly technicianService: TechnicianService) {}

  @Post()
  @ApiCreatedResponse({ type: TechnicianDocument })
  create(@Req() request, @Body() createTechnician: CreateTechnicianDto) {
    return this.technicianService.create(request, createTechnician);
  }

  @Get()
  @ApiOkResponse({ type: TechnicianDocument, isArray: true })
  findAll(
    @Req() request,
    @Query('attendance_unity_fk') attendance_unity_fk: string,
  ) {
    return this.technicianService.findAll(request, attendance_unity_fk);
  }

  @Get(':id')
  @ApiOkResponse({ type: TechnicianDocument })
  findOne(@Req() request, @Param('id') id: string) {
    return this.technicianService.findOne(request, id);
  }

  @Put(':id')
  @ApiCreatedResponse({ type: TechnicianDocument })
  update(
    @Req() request,
    @Param('id') id: string,
    @Body() updateTechnician: UpdateTechnicianDto,
  ) {
    return this.technicianService.update(request, id, updateTechnician);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: TechnicianDocument })
  remove(@Req() request, @Param('id') id: string) {
    return this.technicianService.remove(request, id);
  }
}
