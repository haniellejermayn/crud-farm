import { Controller, Get, Post, Body } from '@nestjs/common';
import { FeedsService } from './feeds.service';
import { CreateFeedStockDto } from './dto/create-stock.dto';
import { FeedAnimalDto } from './dto/feed-animal.dto';

@Controller('feeds')
export class FeedsController {
  constructor(private readonly feedsService: FeedsService) {}

  // Inventory Endpoints
  @Get('stock')
  findAllStock() {
    return this.feedsService.findAllStock();
  }

  @Post('stock')
  addStock(@Body() createStockDto: CreateFeedStockDto) {
    return this.feedsService.addStock(createStockDto);
  }

  // Action Endpoints
  @Post('feed-animal')
  feedAnimal(@Body() feedAnimalDto: FeedAnimalDto) {
    return this.feedsService.feedAnimal(feedAnimalDto);
  }

  @Get('history')
  getHistory() {
    return this.feedsService.getRecentLogs();
  }
}
