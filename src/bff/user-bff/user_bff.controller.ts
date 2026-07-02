import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';
import { CreateUserBffDto } from './dto/create-user_bff.dto';
import { UpdateUserBffDto } from './dto/update-user_bff.dto';
import { UserBffService } from './service/user_bff.service';

@ApiTags('UserBff')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller()
export class UserBffController {
  constructor(private readonly userBffService: UserBffService) {}

  @Get()
  findAll() {
    return this.userBffService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userBffService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateUserBffDto) {
    return this.userBffService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserBffDto) {
    return this.userBffService.update(id, dto);
  }
}
