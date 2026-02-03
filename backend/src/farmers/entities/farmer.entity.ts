import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';

@Entity()
export class Farmer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  role: string;

  @OneToMany(() => Task, (task) => task.farmer)
  tasks: Task[];
}
