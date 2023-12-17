import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoAttachmentDto } from './create-todo-attachment.dto';

export class UpdateTodoAttachmentDto extends PartialType(
  CreateTodoAttachmentDto,
) {}
