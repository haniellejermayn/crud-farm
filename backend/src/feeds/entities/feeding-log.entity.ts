import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Animal } from '../../animals/entities/animal.entity';
import { FeedStock } from './feed-stock.entity';

@Entity()
export class FeedingLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  amount: number;

  @CreateDateColumn()
  fedAt: Date;

  @Column()
  animalId: number;

  @ManyToOne(() => Animal, (animal) => animal.feedingLogs)
  @JoinColumn({ name: 'animalId' })
  animal: Animal;

  @Column()
  feedStockId: number;

  @ManyToOne(() => FeedStock)
  @JoinColumn({ name: 'feedStockId' })
  feedStock: FeedStock;
}
