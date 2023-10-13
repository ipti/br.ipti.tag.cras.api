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

@ApiTags('Charts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller('charts')
export class ChartsController {
  constructor(private readonly chartsService: ChartsService) {}

  @Get('count-attendance')
  @ApiOkResponse({ isArray: true })
  findAll() {
    return this.chartsService.countAttendance();
  }

  @Get('attendance-finished-or-pending')
  @ApiOkResponse({ isArray: true })
  attendanceFinishedOrPending() {
    return this.chartsService.attendanceFinishedOrPending();
  }

  @Get('attendance-by-month')
  @ApiOkResponse({ isArray: true })
  attendanceByMonth() {
    return this.chartsService.attendanceByMonth();
  }
}
