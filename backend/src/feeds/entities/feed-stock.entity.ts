import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FeedStock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('float')
  quantity: number;
}
