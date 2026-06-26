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
import { AttendanceUnityBffService } from './service/attendance_unity_bff.service';
import { Request } from 'express';
import { AttendanceUnityAndAddress } from './doc/attendance_unity_bff';
import { CreateAttendanceUnityAndAddressDto } from './dto/create-attendance_unity_bff.dto';
import { UpdateAttendanceUnityAndAddressDto } from './dto/update-attendance_unity_bff.dto';

@ApiTags('AttendanceUnityBff')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller()
export class AttendanceUnityBffController {
  constructor(
    private readonly AttendanceUnityBffService: AttendanceUnityBffService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: AttendanceUnityAndAddress })
  createAttendanceUnityAndAddress(
    @Req() request: Request,
    @Body() createAttendanceUnityAndAddress: CreateAttendanceUnityAndAddressDto,
  ) {
    return this.AttendanceUnityBffService.createUnityAttendanceAndAddress(
      request,
      createAttendanceUnityAndAddress,
    );
  }

  @Get()
  getAttendanceUnity(
    @Req() request: Request,
    @Query('attendance_unity_fk') attendance_unity_fk: string,
  ) {
    return this.AttendanceUnityBffService.getAttendanceUnity(
      request.user,
      attendance_unity_fk,
    );
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Atualiza unidade e endereço' })
  updateAttendanceUnityAndAddress(
    @Param('id') id: string,
    @Body() dto: UpdateAttendanceUnityAndAddressDto,
  ) {
    return this.AttendanceUnityBffService.updateUnityAttendanceAndAddress(id, dto);
  }

  @Get(':id')
  getAttendanceUnityById(@Param('id') id: string) {
    return this.AttendanceUnityBffService.getAttendanceUnityById(id);
  }
}
