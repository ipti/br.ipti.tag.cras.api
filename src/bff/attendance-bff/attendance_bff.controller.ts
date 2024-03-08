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
import { CreateAttendanceNewUserBffDto } from './dto/create-newuserattendance_bff.dto';

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

  @Post('new-user-attendance')
  @ApiCreatedResponse({})
  createNewUserAttendance(
    @Req() request: Request,
    @Body() createAttendanceDto: CreateAttendanceNewUserBffDto,
  ) {
    return this.AttendanceBffService.createAttendanceNewUser(
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

  @Post('add-family-to-group-attendance')
  @ApiCreatedResponse({})
  addFamilyToGroupAttendance(
    @Req() request: Request,
    @Body('attendanceId') attendanceId: string,
    @Body('familyId') familyId: string,
  ) {
    return this.AttendanceBffService.addFamilyToGroupAttendance(
      request,
      attendanceId,
      familyId,
    );
  }

  @Delete('remove-family-from-group-attendance')
  removeFamilyFromGroupAttendance(
    @Req() request: Request,
    @Query('attendanceId') attendanceId: string,
    @Query('familyId') familyId: string,
  ) {
    return this.AttendanceBffService.removeFamilyFromGroupAttendance(
      request,
      attendanceId,
      familyId,
    );
  }
}
