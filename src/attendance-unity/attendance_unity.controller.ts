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
import { CreateAttendanceUnityDto } from './dto/create-attendance_unity.dto';
import { UpdateAttendanceUnityDto } from './dto/update-attendance_unity.dto';
import { AttendanceUnityService } from './service/attendance_unity.service';
import { AttendanceUnityDocument } from './doc/attendance_unity';

@ApiTags('AttendanceUnity')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller('attendance-unity')
export class AttendanceUnityController {
  constructor(
    private readonly attendanceUnityService: AttendanceUnityService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: AttendanceUnityDocument })
  create(@Req() request, @Body() createTechnician: CreateAttendanceUnityDto) {
    return this.attendanceUnityService.create(request, createTechnician);
  }

  @Get()
  @ApiOkResponse({ type: AttendanceUnityDocument, isArray: true })
  findAll(@Req() request) {
    return this.attendanceUnityService.findAll(request);
  }

  @Get(':id')
  @ApiOkResponse({ type: AttendanceUnityDocument })
  findOne(@Req() request, @Param('id') id: string) {
    return this.attendanceUnityService.findOne(request, id);
  }

  @Put(':id')
  @ApiCreatedResponse({ type: AttendanceUnityDocument })
  update(
    @Req() request,
    @Param('id') id: string,
    @Body() updateTechnician: UpdateAttendanceUnityDto,
  ) {
    return this.attendanceUnityService.update(request, id, updateTechnician);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: AttendanceUnityDocument })
  remove(@Req() request, @Param('id') id: string) {
    return this.attendanceUnityService.remove(request, id);
  }
}
