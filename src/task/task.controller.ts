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
  import { CreateTaskDto } from './dto/create-task.dto';
  import { UpdateTaskDto } from './dto/update-task.dto';
  import { TaskService } from './service/task.service';
  
  @ApiTags('Task')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Controller('task')
  export class TaskController {
    constructor(private readonly taskService: TaskService) {}
  
    @Post()
    @ApiCreatedResponse({})
    create(@Req() request, @Body() createTask: CreateTaskDto) {
      return this.taskService.create(request, createTask);
    }
  
    @Get()
    @ApiOkResponse({ isArray: true })
    findAll(@Req() request) {
      return this.taskService.findAll(request);
    }
  
    @Get(':id')
    @ApiOkResponse({})
    findOne(@Req() request, @Param('id') id: string) {
      return this.taskService.findOne(request, id);
    }
  
    @Put(':id')
    @ApiCreatedResponse({})
    update(
      @Req() request,
      @Param('id') id: string,
      @Body() updateTask: UpdateTaskDto,
    ) {
      return this.taskService.update(request, id, updateTask);
    }
  
    @Delete(':id')
    @ApiCreatedResponse({})
    remove(@Req() request, @Param('id') id: string) {
      return this.taskService.remove(request, id);
    }
  }
  