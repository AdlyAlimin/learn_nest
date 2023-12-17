import { Todo } from 'src/todo/entities/todo.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TodoAttachment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  attachment_name: string;

  @Column()
  attachment_original_name: string;

  @Column()
  attachment_path: string;

  @Column()
  attachment_type: string;

  @Column()
  created_at: Date;

  @ManyToOne(() => Todo, (todo) => todo.todo_attachment)
  todo: Todo;
}
