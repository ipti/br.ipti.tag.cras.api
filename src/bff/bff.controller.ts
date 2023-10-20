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

@ApiTags('BFF')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller('bff')
export class BffController {
  constructor(private readonly bffService: BffService) {}

  @Post('create-user-without-family')
  @ApiCreatedResponse({ type: UserIdentifyWithoutFamily })
  create(
    @Req() request,
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
    @Req() request,
    @Body() createUserWithFamily: CreateUserIdentifyWithFamilyDto,
  ) {
    return this.bffService.createUserWithFamily(request, createUserWithFamily);
  }

  @Post('create-attendance-unity-address')
  @ApiCreatedResponse({ type: AttendanceUnityAndAddress })
  createAttendanceUnityAndAddress(
    @Req() request,
    @Body() createAttendanceUnityAndAddress: CreateAttendanceUnityAndAddressDto,
  ) {
    return this.bffService.createUnityAttendanceAndAddress(
      request,
      createAttendanceUnityAndAddress,
    );
  }

  @Get('get-state')
  @ApiOkResponse({ isArray: true })
  getState(@Req() request) {
    return this.bffService.getState(request);
  }

  @Get('get-city')
  @ApiOkResponse({ isArray: true })
  getCity(@Req() request, @Query('ufId') ufId: string) {
    return this.bffService.getCity(request, ufId);
  }

  @Get('get-attendance')
  @ApiOkResponse({ isArray: true })
  getAttendance(@Req() request) {
    return this.bffService.getAttendance(request);
  }

  @Get('get-all-from-family')
  @ApiOkResponse({ isArray: true })
  getAllFromFamily(@Req() request, @Query('familyId') familyId: string) {
    return this.bffService.getAllFromFamily(request, familyId);
  }
}
