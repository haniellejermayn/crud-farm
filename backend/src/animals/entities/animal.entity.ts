import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { FeedingLog } from '../../feeds/entities/feeding-log.entity';
import { Task } from '../../tasks/entities/task.entity';

@Entity()
export class Animal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column({ default: true })
  isHealthy: boolean;

  @OneToMany(() => FeedingLog, (log) => log.animal)
  feedingLogs: FeedingLog[];

  @OneToMany(() => Task, (task) => task.animal)
  tasks: Task[];
}
