import { Test, TestingModule } from '@nestjs/testing';
import { TodoAttachmentService } from './todo-attachment.service';

describe('TodoAttachmentService', () => {
  let service: TodoAttachmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoAttachmentService],
    }).compile();

    service = module.get<TodoAttachmentService>(TodoAttachmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
