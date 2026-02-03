import { Animal } from 'src/animals/entities/animal.entity';
import { Farmer } from 'src/farmers/entities/farmer.entity';
import { Plant } from 'src/plants/entities/plant.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

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

  // --- farmer ---
  @Column({ nullable: true })
  farmerId?: number;

  @ManyToOne(() => Farmer, (farmer) => farmer.tasks, { nullable: true })
  @JoinColumn({ name: 'farmerId' })
  farmer?: Farmer;

  // --- animal ---
  @Column({ nullable: true })
  animalId?: number;

  @ManyToOne(() => Animal, { nullable: true })
  @JoinColumn({ name: 'animalId' })
  animal?: Animal;

  // --- plant ---
  @Column({ nullable: true })
  plantId?: number;

  @ManyToOne(() => Plant, { nullable: true })
  @JoinColumn({ name: 'plantId' })
  plant?: Plant;
}
