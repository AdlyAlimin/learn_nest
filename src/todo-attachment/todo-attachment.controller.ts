import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TodoAttachmentService } from './todo-attachment.service';
import { CreateTodoAttachmentDto } from './dto/create-todo-attachment.dto';
import { UpdateTodoAttachmentDto } from './dto/update-todo-attachment.dto';
import { AuthGuard } from 'src/guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('todo-attachment')
export class TodoAttachmentController {
  constructor(private readonly todoAttachmentService: TodoAttachmentService) {}

  @Post()
  create(@Body() createTodoAttachmentDto: CreateTodoAttachmentDto) {
    return this.todoAttachmentService.create(createTodoAttachmentDto);
  }

  @Get()
  findAll() {
    return this.todoAttachmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoAttachmentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoAttachmentDto: UpdateTodoAttachmentDto,
  ) {
    return this.todoAttachmentService.update(+id, updateTodoAttachmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoAttachmentService.remove(+id);
  }
}
