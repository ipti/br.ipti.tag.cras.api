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
import { CreateUserIdentifyDto } from './dto/create-user_identify.dto';
import { UpdateUserIdentifyDto } from './dto/update-user_identify.dto';
import { UserIdentifyService } from './service/user_identify.service';
import { UserIdentifyDocument } from './doc/user_identify';

@ApiTags('UserIdentify')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller('user-identify')
export class UserIdentifyController {
  constructor(private readonly user_identifyService: UserIdentifyService) {}

  @Post()
  @ApiCreatedResponse({ type: UserIdentifyDocument })
  create(@Req() request, @Body() createUserIdentify: CreateUserIdentifyDto) {
    return this.user_identifyService.create(request, createUserIdentify);
  }

  @Get()
  @ApiOkResponse({ type: UserIdentifyDocument, isArray: true })
  findAll(@Req() request) {
    return this.user_identifyService.findAll(request);
  }

  @Get(':id')
  @ApiOkResponse({ type: UserIdentifyDocument })
  findOne(@Req() request, @Param('id') id: string) {
    return this.user_identifyService.findOne(request, id);
  }

  @Put(':id')
  @ApiCreatedResponse({ type: UserIdentifyDocument })
  update(
    @Req() request,
    @Param('id') id: string,
    @Body() updateUserIdentify: UpdateUserIdentifyDto,
  ) {
    return this.user_identifyService.update(request, id, updateUserIdentify);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: UserIdentifyDocument })
  remove(@Req() request, @Param('id') id: string) {
    return this.user_identifyService.remove(request, id);
  }
}
