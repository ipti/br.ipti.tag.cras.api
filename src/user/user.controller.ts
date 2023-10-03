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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Controller('user')
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
    @Post()
    @ApiCreatedResponse({})
    create(@Req() request, @Body() createUser: CreateUserDto) {
      return this.userService.create(request, createUser);
    }
  
    @Get()
    @ApiOkResponse({ isArray: true })
    findAll(@Req() request) {
      return this.userService.findAll(request);
    }
  
    @Get(':id')
    @ApiOkResponse({})
    findOne(@Req() request, @Param('id') id: string) {
      return this.userService.findOne(request, id);
    }
  
    @Put(':id')
    @ApiCreatedResponse({})
    update(
      @Req() request,
      @Param('id') id: string,
      @Body() updateUser: UpdateUserDto,
    ) {
      return this.userService.update(request, id, updateUser);
    }
  
    @Delete(':id')
    @ApiCreatedResponse({})
    remove(@Req() request, @Param('id') id: string) {
      return this.userService.remove(request, id);
    }
  }
  