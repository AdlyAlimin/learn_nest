import { Injectable } from '@nestjs/common';
import { CreateTodoAttachmentDto } from './dto/create-todo-attachment.dto';
import { UpdateTodoAttachmentDto } from './dto/update-todo-attachment.dto';

@Injectable()
export class TodoAttachmentService {
  create(createTodoAttachmentDto: CreateTodoAttachmentDto) {
    return 'This action adds a new todoAttachment';
  }

  findAll() {
    return `This action returns all todoAttachment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todoAttachment`;
  }

  update(id: number, updateTodoAttachmentDto: UpdateTodoAttachmentDto) {
    return `This action updates a #${id} todoAttachment`;
  }

  remove(id: number) {
    return `This action removes a #${id} todoAttachment`;
  }
}
