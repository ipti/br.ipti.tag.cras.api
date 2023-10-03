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
  import { CreateBenefitsDto } from './dto/create-benefits.dto';
  import { UpdateBenefitsDto } from './dto/update-benefits.dto';
  import { BenefitsService } from './service/benefits.service';
  
  @ApiTags('Benefits')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Controller('benefits')
  export class BenefitsController {
    constructor(private readonly benefitsService: BenefitsService) {}
  
    @Post()
    @ApiCreatedResponse({})
    create(@Req() request, @Body() createBenefits: CreateBenefitsDto) {
      return this.benefitsService.create(request, createBenefits);
    }
  
    @Get()
    @ApiOkResponse({ isArray: true })
    findAll(@Req() request) {
      return this.benefitsService.findAll(request);
    }
  
    @Get(':id')
    @ApiOkResponse({})
    findOne(@Req() request, @Param('id') id: string) {
      return this.benefitsService.findOne(request, id);
    }
  
    @Put(':id')
    @ApiCreatedResponse({})
    update(
      @Req() request,
      @Param('id') id: string,
      @Body() updateBenefits: UpdateBenefitsDto,
    ) {
      return this.benefitsService.update(request, id, updateBenefits);
    }
  
    @Delete(':id')
    @ApiCreatedResponse({})
    remove(@Req() request, @Param('id') id: string) {
      return this.benefitsService.remove(request, id);
    }
  }
  