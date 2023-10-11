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
  import { CreateUserIdentifyWithoutFamilyDto } from './dto/create-bff.dto';
  import { UpdateBffDto } from './dto/update-bff.dto';
  import { BffService } from './service/bff.service';
  import { UserIdentifyWithoutFamily } from './doc/bff';
  
  @ApiTags('BFF')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth('access-token')
  @Controller('bff')
  export class BffController {
    constructor(
      private readonly bffService: BffService,
    ) {}
  
    @Post('create-user-without-family')
    @ApiCreatedResponse({ type: UserIdentifyWithoutFamily })
    create(@Req() request, @Body() createUserWithoutFamily: CreateUserIdentifyWithoutFamilyDto) {
      return this.bffService.createUserWithoutFamily(request, createUserWithoutFamily);
    }
  }
  