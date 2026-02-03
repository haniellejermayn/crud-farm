import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FeedsService } from './feeds.service';
import { CreateFeedStockDto } from './dto/create-stock.dto';
import { FeedAnimalDto } from './dto/feed-animal.dto';

@Controller('feeds')
export class FeedsController {
  constructor(private readonly feedsService: FeedsService) {}

  // --- Inventory Endpoints ---
  @Get('stock')
  findAllStock() {
    return this.feedsService.findAllStock();
  }

  @Post('stock')
  addStock(@Body() createStockDto: CreateFeedStockDto) {
    return this.feedsService.addStock(createStockDto);
  }

  @Patch('stock/:id')
  updateStock(@Param('id') id: string, @Body() body: any) {
    return this.feedsService.updateStock(+id, body);
  }

  @Delete('stock/:id')
  removeStock(@Param('id') id: string) {
    return this.feedsService.removeStock(+id);
  }

  // --- Action Endpoints ---
  @Post('feed-animal')
  feedAnimal(@Body() feedAnimalDto: FeedAnimalDto) {
    return this.feedsService.feedAnimal(feedAnimalDto);
  }

  @Get('history')
  getHistory() {
    return this.feedsService.getRecentLogs();
  }

  @Delete('history/:id')
  removeLog(@Param('id') id: string) {
    return this.feedsService.removeLog(+id);
  }
}
