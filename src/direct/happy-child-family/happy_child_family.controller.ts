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
  import { HappyChildFamilyService } from './service/happy_child.service';
import { HappyChildFamilyDocument } from './doc/happy_child_family';
import { CreateFamilyOnHcDto } from './dto/create-happy_child_family.dto';
import { UpdateFamilyOnHcDto } from './dto/update-happy_child_family.dto';

  
  @ApiTags('HappyChildFamily')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Controller()
  export class HappyChildFamilyController {
    constructor(
      private readonly happyChildFamilyService: HappyChildFamilyService,
    ) {}
  
    @Post()
    @ApiCreatedResponse({ type: HappyChildFamilyDocument })
    create(@Req() request, @Body() createFamilyOnHcDto: CreateFamilyOnHcDto) {
      return this.happyChildFamilyService.create(createFamilyOnHcDto);
    }
  
    @Get()
    @ApiOkResponse({ type: HappyChildFamilyDocument, isArray: true })
    findAll(@Req() request) {
      return this.happyChildFamilyService.findAll(request);
    }
  
    @Get(':id')
    @ApiOkResponse({ type: HappyChildFamilyDocument })
    findOne(@Req() request, @Param('id') id: string) {
      return this.happyChildFamilyService.findOne(request, +id);
    }
  
    @Put(':id')
    @ApiCreatedResponse({ type: HappyChildFamilyDocument })
    update(
      @Req() request,
      @Param('id') id: string,
      @Body() updateTechnician: UpdateFamilyOnHcDto,
    ) {
      return this.happyChildFamilyService.update(request, id, updateTechnician);
    }
  
    @Delete(':id')
    @ApiCreatedResponse({ type: HappyChildFamilyDocument })
    remove(@Req() request, @Param('id') id: string) {
      return this.happyChildFamilyService.remove(request, id);
    }
}
  