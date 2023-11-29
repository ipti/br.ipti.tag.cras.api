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
import { ForwardingBffService } from './service/forwarding_bff.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';
import { CreateForwardingDto } from './dto/create-forwarding.dto';

@ApiTags('ForwardingBff')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller()
export class ForwardingBffController {
  constructor(private readonly ForwardingBffService: ForwardingBffService) {}

  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        date: { type: 'string' },
        canDelete: { type: 'boolean' },
        type: { type: 'string' },
      },
    },
  })
  createForwarding(
    @Req() request: Request,
    @Body() forwardingCreate: CreateForwardingDto,
  ) {
    return this.ForwardingBffService.createForwarding(
      request.user,
      forwardingCreate,
    );
  }

  @Put(':forwardingId')
  @ApiOkResponse({ isArray: true })
  updateForwarding(
    @Param('forwardingId') forwardingId: string,
    @Body() forwardingCreate: CreateForwardingDto,
  ) {
    return this.ForwardingBffService.updateForwarding(
      forwardingId,
      forwardingCreate,
    );
  }

  @Get()
  getForwardings(@Query('edcenso_city_fk') edcenso_city_fk: number) {
    return this.ForwardingBffService.getforwardings(edcenso_city_fk);
  }
}
