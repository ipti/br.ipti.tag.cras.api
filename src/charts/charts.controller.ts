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
import { ChartsService } from './service/charts.service';
import { Request } from 'express';

@ApiTags('Charts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller('charts')
export class ChartsController {
  constructor(private readonly chartsService: ChartsService) {}

  @Get('count-attendance')
  @ApiOkResponse({ isArray: true })
  findAll(@Req() request: Request) {
    return this.chartsService.countAttendance(request);
  }

  @Get('attendance-finished-or-pending')
  @ApiOkResponse({ isArray: true })
  attendanceFinishedOrPending(@Req() request: Request) {
    return this.chartsService.attendanceFinishedOrPending(request);
  }

  @Get('attendance-by-month')
  @ApiOkResponse({ isArray: true })
  attendanceByMonth(@Req() request: Request) {
    return this.chartsService.attendanceByMonth(request);
  }

  @Get('vulnerability-registered')
  @ApiOkResponse({ isArray: true })
  vulnerabilityRegistered(@Req() request: Request) {
    return this.chartsService.vulnerabilityRegistered(request);
  }
}
