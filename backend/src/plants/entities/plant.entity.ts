import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Plant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  plantedAt: Date;

  @Column({ default: false })
  isReadyToHarvest: boolean;
}
