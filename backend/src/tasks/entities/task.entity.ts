import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Farmer } from '../../farmers/entities/farmer.entity';
import { Animal } from '../../animals/entities/animal.entity';

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: TaskStatus.PENDING })
  status: TaskStatus;

  @Column({ type: 'timestamp', nullable: true })
  dueDate?: Date;

  @Column({ nullable: true })
  farmerId?: number;

  @ManyToOne(() => Farmer, (farmer) => farmer.tasks, { nullable: true })
  @JoinColumn({ name: 'farmerId' })
  farmer?: Farmer;

  @Column({ nullable: true })
  animalId?: number;

  @ManyToOne(() => Animal, (animal) => animal.tasks, { nullable: true })
  @JoinColumn({ name: 'animalId' })
  animal?: Animal;
}
