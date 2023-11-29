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
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FOUIForwardingBffService } from './service/FOUIforwarding_bff.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';
import { CreateFOUIForwardingDto } from './dto/create-FOUIforwarding.dto';

@ApiTags('FOUIForwardingBff')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller()
export class FOUIForwardingBffController {
  constructor(
    private readonly FOUIForwardingBffService: FOUIForwardingBffService,
  ) {}

  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        family: { type: 'number' },
        user_identify: { type: 'number' },
        forwading: { type: 'number' },
        description: { type: 'string' }
      },
    },
  })
  @ApiOkResponse({ isArray: true })
  createForwarding(@Body() forwardingCreate: CreateFOUIForwardingDto) {
    return this.FOUIForwardingBffService.createForwarding(forwardingCreate);
  }

  @Get('family')
  @ApiOkResponse({ isArray: true })
  getFamilyForwarding(
    @Req() request: Request,
    @Query('familyId') familyId: string,
  ) {
    return this.FOUIForwardingBffService.getFamilyForwarding(request, familyId);
  }

  @Get('user-identify')
  @ApiOkResponse({ isArray: true })
  getUserIdentifyForwarding(
    @Req() request: Request,
    @Query('userIdentifyId') userIdentifyId: string,
  ) {
    return this.FOUIForwardingBffService.getUserIdentifyForwarding(
      request,
      userIdentifyId,
    );
  }
}
