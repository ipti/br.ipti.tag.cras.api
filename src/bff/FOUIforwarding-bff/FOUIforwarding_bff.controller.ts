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
import { UpdateFOUIForwardingDto } from './dto/update-FOUIforwarding.dto';

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
        description: { type: 'string' },
        report: { type: 'string' },
      },
    },
  })
  @ApiOkResponse({ isArray: true })
  createForwarding(@Req() request: Request, @Body() forwardingCreate: CreateFOUIForwardingDto) {
    return this.FOUIForwardingBffService.createForwarding(request.user, forwardingCreate);
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

  @Get('forwarding')
  getForwardingById(
    @Req() request: Request,
    @Query('forwardingId') forwardingId: string,
  ) {
    return this.FOUIForwardingBffService.getForwardingById(request, forwardingId);
  }

  @Put(':forwardingId')
  @ApiOkResponse({ isArray: true })
  updateForwarding(
    @Param('forwardingId') forwardingId: string,
    @Body() forwardingUpdateStatus: UpdateFOUIForwardingDto,
  ) {
    return this.FOUIForwardingBffService.updateForwarding(forwardingId, forwardingUpdateStatus);
  }

}
