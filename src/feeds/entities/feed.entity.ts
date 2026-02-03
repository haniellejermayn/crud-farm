import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Animal } from '../../animals/entities/animal.entity';

@Entity()
export class Feed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column()
  animalId: number;

  @ManyToOne(() => Animal, (animal) => animal.feeds)
  @JoinColumn({ name: 'animalId' })
  animal: Animal;
}
