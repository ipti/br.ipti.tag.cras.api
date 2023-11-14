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
import { CreateFamilyBenefitsDto } from './dto/create-family_benefits.dto';
import { UpdateFamilyBenefitsDto } from './dto/update-family_benefits.dto';
import { FamilyBenefitsService } from './service/family_benefits.service';
import { FamilyBenefitsDocument } from './doc/family_benefits';

@ApiTags('FamilyBenefits')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller('family-benefits')
export class FamilyBenefitsController {
  constructor(
    private readonly familyBenefitsService: FamilyBenefitsService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: FamilyBenefitsDocument })
  create(@Req() request, @Body() createTechnician: CreateFamilyBenefitsDto) {
    return this.familyBenefitsService.create(request, createTechnician);
  }

  @Get()
  @ApiOkResponse({ type: FamilyBenefitsDocument, isArray: true })
  findAll(@Req() request) {
    return this.familyBenefitsService.findAll(request);
  }

  @Get(':id')
  @ApiOkResponse({ type: FamilyBenefitsDocument })
  findOne(@Req() request, @Param('id') id: string) {
    return this.familyBenefitsService.findOne(request, id);
  }

  @Put(':id')
  @ApiCreatedResponse({ type: FamilyBenefitsDocument })
  update(
    @Req() request,
    @Param('id') id: string,
    @Body() updateTechnician: UpdateFamilyBenefitsDto,
  ) {
    return this.familyBenefitsService.update(request, id, updateTechnician);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: FamilyBenefitsDocument })
  remove(@Req() request, @Param('id') id: string) {
    return this.familyBenefitsService.remove(request, id);
  }
}
