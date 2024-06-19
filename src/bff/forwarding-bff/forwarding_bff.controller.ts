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
import { Status_document } from '@prisma/client';
import { UpdateForwardingDto } from './dto/update-forwarding.dto';

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
        canDelete: { type: 'boolean' },
        type: { type: 'string' },
      },
    },
  })
  createForwarding(
    @Req() request: Request,
    @Body() forwardingCreate: CreateForwardingDto,
  ) {
    console.log('forwardingCreate', forwardingCreate);
    return this.ForwardingBffService.createForwarding(
      request.user,
      forwardingCreate,
    );
  }

  @Put(':forwardingId')
  @ApiOkResponse({ isArray: true })
  updateForwarding(
    @Param('forwardingId') forwardingId: string,
    @Body() forwardingCreate: UpdateForwardingDto,
  ) {
    return this.ForwardingBffService.updateForwarding(
      forwardingId,
      forwardingCreate,
    );
  }

  @Get()
  getForwardings(@Req() request: Request) {
    return this.ForwardingBffService.getforwardings(request.user);
  }

}
