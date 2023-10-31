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
import {
  CreateAttendanceUnityAndAddressDto,
  CreateUserIdentifyWithFamilyDto,
  CreateUserIdentifyWithoutFamilyDto,
} from './dto/create-bff.dto';
import { UpdateBffDto } from './dto/update-bff.dto';
import { BffService } from './service/bff.service';
import { AttendanceUnityAndAddress, UserIdentifyWithFamily, UserIdentifyWithoutFamily } from './doc/bff';
import { Request } from 'express';

@ApiTags('BFF')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller('bff')
export class BffController {
  constructor(private readonly bffService: BffService) {}

  @Post('create-user-without-family')
  @ApiCreatedResponse({ type: UserIdentifyWithoutFamily })
  create(
    @Req() request: Request,
    @Body() createUserWithoutFamily: CreateUserIdentifyWithoutFamilyDto,
  ) {
    return this.bffService.createUserWithoutFamily(
      request,
      createUserWithoutFamily,
    );
  }

  @Post('create-user-with-family')
  @ApiCreatedResponse({ type: UserIdentifyWithFamily })
  createWithFamily(
    @Req() request: Request,
    @Body() createUserWithFamily: CreateUserIdentifyWithFamilyDto,
  ) {
    return this.bffService.createUserWithFamily(request, createUserWithFamily);
  }

  @Post('create-attendance-unity-address')
  @ApiCreatedResponse({ type: AttendanceUnityAndAddress })
  createAttendanceUnityAndAddress(
    @Req() request: Request,
    @Body() createAttendanceUnityAndAddress: CreateAttendanceUnityAndAddressDto,
  ) {
    return this.bffService.createUnityAttendanceAndAddress(
      request,
      createAttendanceUnityAndAddress,
    );
  }

  @Get('get-attendance')
  @ApiOkResponse({ isArray: true })
  getAttendance(@Req() request: Request) {
    return this.bffService.getAttendance(request);
  }

  @Get('get-all-from-family')
  @ApiOkResponse({ isArray: true })
  getAllFromFamily(@Req() request: Request, @Query('familyId') familyId: string) {
    return this.bffService.getAllFromFamily(request, familyId);
  }

  @Get('get-all-family-representative')
  @ApiOkResponse({ isArray: true })
  getAllFamilyRepresentative(@Req() request: Request) {
    return this.bffService.getAllFamilyWithRepresentative(request);
  }
}
