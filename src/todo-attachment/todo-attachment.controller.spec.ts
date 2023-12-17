import { Test, TestingModule } from '@nestjs/testing';
import { TodoAttachmentController } from './todo-attachment.controller';
import { TodoAttachmentService } from './todo-attachment.service';

describe('TodoAttachmentController', () => {
  let controller: TodoAttachmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoAttachmentController],
      providers: [TodoAttachmentService],
    }).compile();

    controller = module.get<TodoAttachmentController>(TodoAttachmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
