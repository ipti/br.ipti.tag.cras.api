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
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressService } from './service/address.service';
import { AddressDocument } from './doc/address.doc';

@ApiTags('Address')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @ApiCreatedResponse({type: AddressDocument})
  create(@Req() request, @Body() createAddress: CreateAddressDto) {
    return this.addressService.create(request, createAddress);
  }

  @Get()
  @ApiOkResponse({type: AddressDocument})
  findAll(@Req() request) {
    return this.addressService.findAll(request);
  }

  @Get(':id')
  @ApiOkResponse({type: AddressDocument})
  findOne(@Req() request, @Param('id') id: string) {
    return this.addressService.findOne(request, id);
  }

  @Put(':id')
  @ApiCreatedResponse({type: AddressDocument})
  update(
    @Req() request,
    @Param('id') id: string,
    @Body() updateAddress: UpdateAddressDto,
  ) {
    return this.addressService.update(request, id, updateAddress);
  }

  @Delete(':id')
  @ApiCreatedResponse({type: AddressDocument})
  remove(@Req() request, @Param('id') id: string) {
    return this.addressService.remove(request, id);
  }
}
