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
  import { JwtAuthGuard } from '../../auth/shared/jwt-auth.guard';
  import { CreateAttendanceDto } from './dto/create-attendance.dto';
  import { UpdateAttendanceDto } from './dto/update-attendance.dto';
  import { AttendanceService } from './service/attendance.service';
import { AttendanceDocument } from './doc/attendance.doc';
  
  @ApiTags('Attendance')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Controller('attendance')
  export class AttendanceController {
    constructor(private readonly attendanceService: AttendanceService) {}
  
    @Post()
    @ApiCreatedResponse({ type: AttendanceDocument })
    create(@Req() request, @Body() createAttendance: CreateAttendanceDto) {
      return this.attendanceService.create(request, createAttendance);
    }
  
    @Get()
    @ApiOkResponse({ type: AttendanceDocument, isArray: true })
    findAll(@Req() request) {
      return this.attendanceService.findAll(request);
    }
  
    @Get(':id')
    @ApiOkResponse({ type: AttendanceDocument })
    findOne(@Req() request, @Param('id') id: string) {
      return this.attendanceService.findOne(request, id);
    }
  
    @Put(':id')
    @ApiCreatedResponse({ type: AttendanceDocument })
    update(
      @Req() request,
      @Param('id') id: string,
      @Body() updateAttendance: UpdateAttendanceDto,
    ) {
      return this.attendanceService.update(request, id, updateAttendance);
    }
  
    @Delete(':id')
    @ApiCreatedResponse({ type: AttendanceDocument })
    remove(@Req() request, @Param('id') id: string) {
      return this.attendanceService.remove(request, id);
    }
  }
  