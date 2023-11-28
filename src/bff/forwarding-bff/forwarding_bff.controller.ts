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
  @ApiOkResponse({ isArray: true })
  createForwarding(@Body() forwardingCreate: CreateForwardingDto) {
    return this.ForwardingBffService.createForwarding(forwardingCreate);
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
}
