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
  import { CreateHappyChildFamilyDto } from '../dto/create-happy_child_family.dto'
  import { UpdateHappyChildFamilyDto } from '../dto/update-happy_child_family.dto'
  import { HappyChildFamilyService } from '../service/happy_child_family.service'
  import { HappyChildFamilyDocument } from '../doc/happy_child_family'
  
  @ApiTags('FamilyBenefits')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Controller()
  export class FamilyBenefitsController {
    constructor(
      private readonly happyChildFamilyService: HappyChildFamilyService,
    ) {}
  
    @Post()
    @ApiCreatedResponse({ type: HappyChildFamilyDocument })
    create(@Req() request, @Body() createTechnician: CreateHappyChildFamilyDto) {
      return this.happyChildFamilyService.create(request, createTechnician);
    }
  
    @Get()
    @ApiOkResponse({ type: HappyChildFamilyDocument, isArray: true })
    findAll(@Req() request) {
      return this.happyChildFamilyService.findAll(request);
    }
  
    @Get(':id')
    @ApiOkResponse({ type: HappyChildFamilyDocument })
    findOne(@Req() request, @Param('id') id: string) {
      return this.happyChildFamilyService.findOne(request, id);
    }
  
    @Put(':id')
    @ApiCreatedResponse({ type: HappyChildFamilyDocument })
    update(
      @Req() request,
      @Param('id') id: string,
      @Body() updateTechnician: UpdateHappyChildFamilyDto,
    ) {
      return this.happyChildFamilyService.update(request, id, updateTechnician);
    }
  
    @Delete(':id')
    @ApiCreatedResponse({ type: HappyChildFamilyDocument })
    remove(@Req() request, @Param('id') id: string) {
      return this.happyChildFamilyService.remove(request, id);
    }
}
  