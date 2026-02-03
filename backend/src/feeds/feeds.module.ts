import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedsService } from './feeds.service';
import { FeedsController } from './feeds.controller';
import { FeedStock } from './entities/feed-stock.entity';
import { FeedingLog } from './entities/feeding-log.entity';
import { Animal } from '../animals/entities/animal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FeedStock, FeedingLog, Animal])],
  controllers: [FeedsController],
  providers: [FeedsService],
})
export class FeedsModule {}
