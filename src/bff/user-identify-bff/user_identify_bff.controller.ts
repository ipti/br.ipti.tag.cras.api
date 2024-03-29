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
import { UserIdentifyBffService } from './service/user_identify_bff.service';
import {
  UserIdentifyWithFamily,
  UserIdentifyWithoutFamily,
} from './doc/user_identify_bff';
import { JwtAuthGuard } from '../../auth/shared/jwt-auth.guard';
import { Request } from 'express';
import {
  CreateUserIdentifyWithFamilyDto,
  CreateUserIdentifyWithoutFamilyDto,
} from './dto/create-user_identify_bff.dto';
import { SeatchUserByNameOrCPFDto } from './dto/search-user_identify-bff.dto';

@ApiTags('UserIdentifyBff')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller()
export class UserIdentifyBffController {
  constructor(
    private readonly user_identifyBffService: UserIdentifyBffService,
  ) {}

  @Post('create-user-without-family')
  @ApiCreatedResponse({ type: UserIdentifyWithoutFamily })
  create(
    @Req() request: Request,
    @Body() createUserWithoutFamily: CreateUserIdentifyWithoutFamilyDto,
  ) {
    return this.user_identifyBffService.createUserWithoutFamily(
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
    return this.user_identifyBffService.createUserWithFamily(
      request,
      createUserWithFamily,
    );
  }

  @Get('from-attendance-unity')
  getUserIdentifyFromAttendanceUnity(
    @Req() request: Request,
    @Query('attendance_unity_fk') attendance_unity_fk: string,
  ) {
    return this.user_identifyBffService.getUsersIdentify(
      request.user,
      attendance_unity_fk,
    );
  }

  @Get('search')
  getById(@Req() request: Request, @Query('nameorcpf') nameorcpf: string) {
    return this.user_identifyBffService.searchUserByNameOrCPF(nameorcpf);
  }
}
