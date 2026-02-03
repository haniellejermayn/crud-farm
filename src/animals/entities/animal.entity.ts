import { Feed } from './../../feeds/entities/feed.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

  @OneToMany(() => Feed, (feed) => feed.animal)
  feeds: Feed[];
}
