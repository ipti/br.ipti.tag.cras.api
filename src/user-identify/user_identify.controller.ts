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
  import { CreateUserIdentifyDto } from './dto/create-user_identify.dto';
  import { UpdateUserIdentifyDto } from './dto/update-user_identify.dto';
  import { UserIdentifyService } from './service/user_identify.service';
  
  @ApiTags('UserIdentify')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Controller('user-identify')
  export class UserIdentifyController {
    constructor(private readonly user_identifyService: UserIdentifyService) {}
  
    @Post()
    @ApiCreatedResponse({})
    create(@Req() request, @Body() createUserIdentify: CreateUserIdentifyDto) {
      return this.user_identifyService.create(request, createUserIdentify);
    }
  
    @Get()
    @ApiOkResponse({ isArray: true })
    findAll(@Req() request) {
      return this.user_identifyService.findAll(request);
    }
  
    @Get(':id')
    @ApiOkResponse({})
    findOne(@Req() request, @Param('id') id: string) {
      return this.user_identifyService.findOne(request, id);
    }
  
    @Put(':id')
    @ApiCreatedResponse({})
    update(
      @Req() request,
      @Param('id') id: string,
      @Body() updateUserIdentify: UpdateUserIdentifyDto,
    ) {
      return this.user_identifyService.update(request, id, updateUserIdentify);
    }
  
    @Delete(':id')
    @ApiCreatedResponse({})
    remove(@Req() request, @Param('id') id: string) {
      return this.user_identifyService.remove(request, id);
    }
  }
  