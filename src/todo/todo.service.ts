import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { DataSource, Repository } from 'typeorm';
import { TodoAttachment } from 'src/todo-attachment/entities/todo-attachment.entity';
import multer from 'multer';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    private dataSource: DataSource,
  ) {}

  async create(createTodoDto: CreateTodoDto, file) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const todo = new Todo();

      todo.title = createTodoDto.title;
      todo.description = createTodoDto.description;
      todo.created_at = new Date(createTodoDto.created_at);

      const res = await queryRunner.manager.save(todo);

      const todoAttachment = new TodoAttachment();

      if (file) {
        todoAttachment.attachment_name = file.filename;
        todoAttachment.attachment_original_name = file.originalname;
        todoAttachment.attachment_path = file.path;
        todoAttachment.attachment_type = file.mimetype;
        todoAttachment.created_at = new Date(createTodoDto.created_at);
        todoAttachment.todo = res;

        await queryRunner.manager.save(todoAttachment);
      }

      await queryRunner.commitTransaction();

      return res;
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return 'This action adds a new todo';
  }

  findAll() {
    return this.dataSource.getRepository(Todo).find({
      relations: {
        todo_attachment: true,
      },
    });
    // return `This action returns all todo`;
  }

  findOne(id) {
    return this.todoRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        todo_attachment: true,
      },
    });
  }

  async update(id, updateTodoDto: UpdateTodoDto) {
    try {
      const todo = await this.todoRepository.findOneBy({ id });

      if (todo == null) {
        return HttpStatus.NOT_FOUND;
      }

      todo.title = updateTodoDto.title;

      const res = await this.todoRepository.save(todo);

      return res;
    } catch (err) {
      console.log(err);
    }
  }

  remove(id) {
    return this.todoRepository.delete(id);
  }
}
