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
  import { CreateUserDto } from './dto/create-user.dto';
  import { UpdateUserDto } from './dto/update-user.dto';
  import { UserService } from './service/user.service';
  
  @ApiTags('User')
  @Controller('user')
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
    @Post()
    @ApiCreatedResponse({})
    create(@Req() request, @Body() createUser: CreateUserDto) {
      return this.userService.create(request, createUser);
    }
  
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOkResponse({ isArray: true })
    findAll(@Req() request) {
      return this.userService.findAll(request);
    }
  
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOkResponse({})
    findOne(@Req() request, @Param('id') id: string) {
      return this.userService.findOne(request, id);
    }
  
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiCreatedResponse({})
    update(
      @Req() request,
      @Param('id') id: string,
      @Body() updateUser: UpdateUserDto,
    ) {
      return this.userService.update(request, id, updateUser);
    }
  
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiCreatedResponse({})
    remove(@Req() request, @Param('id') id: string) {
      return this.userService.remove(request, id);
    }
  }
  