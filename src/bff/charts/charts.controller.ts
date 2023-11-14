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
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/shared/jwt-auth.guard';
import { ChartsService } from './service/charts.service';
import { Request } from 'express';

@ApiTags('Charts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller('charts')
export class ChartsController {
  constructor(private readonly chartsService: ChartsService) {}

  @Get('count-attendance')
  @ApiQuery({ name: 'year', type: Number })
  findAll(@Req() request: Request, @Query('year') year: number) {
    return this.chartsService.countAttendance(request, year);
  }

  @Get('count-family')
  countFamily(
    @Req() request: Request,
    @Query('attendance_unity_fk') attendance_unity_fk: string,
  ) {
    return this.chartsService.countFamily(request, attendance_unity_fk);
  }

  @Get('count-uni-family')
  countUniFamly(
    @Req() request: Request,
    @Query('attendance_unity_fk') attendance_unity_fk: string,
  ) {
    return this.chartsService.countUniFamly(request, attendance_unity_fk);
  }

  @Get('attendance-finished-or-pending')
  @ApiQuery({ name: 'year', type: Number })
  attendanceFinishedOrPending(
    @Req() request: Request,
    @Query('year') year: number,
    @Query('attendance_unity_fk') attendance_unity_fk: string,
  ) {
    return this.chartsService.attendanceFinishedOrPending(
      request,
      year,
      attendance_unity_fk,
    );
  }

  @Get('attendance-by-month')
  @ApiQuery({ name: 'year', type: Number })
  attendanceByMonth(
    @Req() request: Request,
    @Query('year') year: number,
    @Query('attendance_unity_fk') attendance_unity_fk: string,
  ) {
    return this.chartsService.attendanceByMonth(
      request,
      year,
      attendance_unity_fk,
    );
  }

  @Get('vulnerability-registered')
  @ApiOkResponse({ isArray: true })
  vulnerabilityRegistered(@Req() request: Request) {
    return this.chartsService.vulnerabilityRegistered(request);
  }
}
