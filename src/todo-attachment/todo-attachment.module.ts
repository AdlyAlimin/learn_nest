import { Module } from '@nestjs/common';
import { TodoAttachmentService } from './todo-attachment.service';
import { TodoAttachmentController } from './todo-attachment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoAttachment } from './entities/todo-attachment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodoAttachment])],
  controllers: [TodoAttachmentController],
  providers: [TodoAttachmentService],
})
export class TodoAttachmentModule {}
