import { TodoAttachment } from 'src/todo-attachment/entities/todo-attachment.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  is_done: boolean;

  @Column()
  created_at: Date;

  @OneToMany(() => TodoAttachment, (todo_attachment) => todo_attachment.todo)
  todo_attachment: TodoAttachment[];
}
