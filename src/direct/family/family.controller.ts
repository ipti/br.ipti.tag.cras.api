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
  import { CreateFamilyDto } from './dto/create-family.dto';
  import { UpdateFamilyDto } from './dto/update-family.dto';
  import { FamilyService } from './service/family.service';
  
  @ApiTags('Family')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Controller()
  export class FamilyController {
    constructor(private readonly familyService: FamilyService) {}
  
    @Post()
    @ApiCreatedResponse({})
    create(@Req() request, @Body() createFamily: CreateFamilyDto) {
      return this.familyService.create(request, createFamily);
    }
  
    @Get()
    @ApiOkResponse({ isArray: true })
    findAll(@Req() request) {
      return this.familyService.findAll(request);
    }
  
    @Get(':id')
    @ApiOkResponse({})
    findOne(@Req() request, @Param('id') id: string) {
      return this.familyService.findOne(request, id);
    }
  
    @Put(':id')
    @ApiCreatedResponse({})
    update(
      @Req() request,
      @Param('id') id: string,
      @Body() updateFamily: UpdateFamilyDto,
    ) {
      return this.familyService.update(request, id, updateFamily);
    }
  
    @Delete(':id')
    @ApiCreatedResponse({})
    remove(@Req() request, @Param('id') id: string) {
      return this.familyService.remove(request, id);
    }
  }
  