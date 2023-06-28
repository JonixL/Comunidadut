import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes,ValidationPipe, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';


@Controller('task')
@UsePipes(new ValidationPipe())
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('createTask')
  create(@Body() createTask: CreateTaskDto) {
    return this.taskService.create(createTask);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Get('imp/:important')
  buscarimpor(@Param('important') important: number){
    return this.taskService.buscarimpor(+important);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }

  @Get('search')
  search(@Query('termino')termino: string){
    return this.taskService.search(termino);
  }
}
