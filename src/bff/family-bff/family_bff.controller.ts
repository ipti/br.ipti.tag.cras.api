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
import { FamilyBffService } from './service/family_bff.service';
import { Request } from 'express';

@ApiTags('FamilyBff')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller('family-bff')
export class FamilyBffController {
  constructor(private readonly FamilyBffService: FamilyBffService) {}

  @Get('get-all-from-family')
  @ApiOkResponse({ isArray: true })
  getAllFromFamily(
    @Req() request: Request,
    @Query('familyId') familyId: string,
  ) {
    return this.FamilyBffService.getAllFromFamily(request, familyId);
  }

  @Get('get-all-family-representative')
  @ApiOkResponse({ isArray: true })
  getAllFamilyRepresentative(
    @Req() request: Request,
    @Query('attendance_unity_fk') attendance_unity_fk: string,
  ) {
    return this.FamilyBffService.getAllFamilyWithRepresentative(
      request,
      attendance_unity_fk,
    );
  }
}
