import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimalsModule } from './animals/animals.module';
import { FeedsModule } from './feeds/feeds.module';
import { PlantsModule } from './plants/plants.module';
import { FarmersModule } from './farmers/farmers.module';
import { TasksModule } from './tasks/tasks.module';
import { FeedStocksModule } from './feed-stocks/feed-stocks.module';
import { FeedingLogsModule } from './feeding-logs/feeding-logs.module';
import { FeedsModule } from './feeds/feeds.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Keana0705!',
      database: 'farm_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AnimalsModule,
    FeedsModule,
    PlantsModule,
    FarmersModule,
    TasksModule,
    FeedStocksModule,
    FeedingLogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
