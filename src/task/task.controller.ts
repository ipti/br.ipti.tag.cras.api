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
import { TaskDocument } from './doc/task';

@ApiTags('Task')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiCreatedResponse({ type: TaskDocument })
  create(@Req() request, @Body() createTask: CreateTaskDto) {
    return this.taskService.create(request, createTask);
  }

  @Get()
  @ApiOkResponse({ type: TaskDocument, isArray: true })
  findAll(@Req() request) {
    return this.taskService.findAll(request);
  }

  @Get(':id')
  @ApiOkResponse({ type: TaskDocument })
  findOne(@Req() request, @Param('id') id: string) {
    return this.taskService.findOne(request, id);
  }

  @Put(':id')
  @ApiCreatedResponse({ type: TaskDocument })
  update(
    @Req() request,
    @Param('id') id: string,
    @Body() updateTask: UpdateTaskDto,
  ) {
    return this.taskService.update(request, id, updateTask);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: TaskDocument })
  remove(@Req() request, @Param('id') id: string) {
    return this.taskService.remove(request, id);
  }
}
