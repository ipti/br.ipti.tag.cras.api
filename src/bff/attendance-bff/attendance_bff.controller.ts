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
import { AttendanceBffService } from './service/attendance_bff.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';

@ApiTags('AttendanceBff')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller('attendance-bff')
export class AttendanceBffController {
  constructor(private readonly AttendanceBffService: AttendanceBffService) {}

  @Get()
  @ApiOkResponse({ isArray: true })
  getAttendance(
    @Req() request: Request,
    @Query('attendance_unity_fk') attendance_unity_fk: string,
  ) {
    return this.AttendanceBffService.getAttendance(
      request,
      attendance_unity_fk,
    );
  }
}
