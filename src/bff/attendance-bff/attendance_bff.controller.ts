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
import { AttendanceBffService } from './service/attendance_bff.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';
import { CreateMultiFamilyAttendanceDto } from './dto/create-multifamilyattendance.dto';

@ApiTags('AttendanceBff')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller()
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

  @Post()
  @ApiBody({ schema: { type: 'array', items: { type: 'object' } } })
  @ApiCreatedResponse({})
  createAttendance(
    @Req() request: Request,
    @Body() createAttendanceDto: CreateMultiFamilyAttendanceDto,
  ) {
    return this.AttendanceBffService.createMultiFamilyAttendance(
      request,
      createAttendanceDto,
    );
  }

  @Get('group-attendance')
  @ApiOkResponse({ isArray: true })
  getGroupAttendance(
    @Req() request: Request,
    @Query('attendance_unity_fk') attendance_unity_fk: string,
  ) {
    return this.AttendanceBffService.getGroupAttendance(
      request,
      attendance_unity_fk,
    );
  }

  @Get('group-attendance/:id')
  @ApiOkResponse({})
  getGroupAttendanceById(@Req() request: Request, @Param('id') id: string) {
    return this.AttendanceBffService.getOneGroupAttendance(request, id);
  }
}
