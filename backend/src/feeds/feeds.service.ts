import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeedStock } from './entities/feed-stock.entity';
import { FeedingLog } from './entities/feeding-log.entity';
import { Animal } from '../animals/entities/animal.entity';
import { FeedAnimalDto } from './dto/feed-animal.dto';
import { CreateFeedStockDto } from './dto/create-stock.dto';

@Injectable()
export class FeedsService {
  constructor(
    @InjectRepository(FeedStock)
    private stockRepo: Repository<FeedStock>,
    @InjectRepository(FeedingLog)
    private logRepo: Repository<FeedingLog>,
    @InjectRepository(Animal)
    private animalRepo: Repository<Animal>,
  ) {}

  // --- Inventory Logic ---
  findAllStock() {
    return this.stockRepo.find();
  }

  addStock(dto: CreateFeedStockDto) {
    const stock = this.stockRepo.create(dto);
    return this.stockRepo.save(stock);
  }

  async updateStock(id: number, dto: Partial<CreateFeedStockDto>) {
    await this.stockRepo.update(id, dto);
    return this.stockRepo.findOneBy({ id });
  }

  async removeStock(id: number) {
    await this.stockRepo.delete(id);
    return { deleted: true };
  }

  // --- Action Logic ---
  async feedAnimal(dto: FeedAnimalDto) {
    const stock = await this.stockRepo.findOneBy({ id: dto.feedStockId });
    if (!stock) throw new NotFoundException('Feed stock not found');

    if (stock.quantity < dto.amount) {
      throw new BadRequestException(
        `Insufficient stock. Only ${stock.quantity} available.`,
      );
    }

    const animal = await this.animalRepo.findOneBy({ id: dto.animalId });
    if (!animal) throw new NotFoundException('Animal not found');

    // 1. Reduce Stock
    stock.quantity -= dto.amount;
    await this.stockRepo.save(stock);

    // 2. Create Log
    const log = this.logRepo.create({
      amount: dto.amount,
      animalId: dto.animalId,
      feedStockId: dto.feedStockId,
    });

    return this.logRepo.save(log);
  }

  getRecentLogs() {
    return this.logRepo.find({
      relations: ['animal', 'feedStock'],
      order: { fedAt: 'DESC' },
      take: 20,
    });
  }

  // --- UPDATED: Refund Logic ---
  async removeLog(id: number) {
    // 1. Find the log to get the amount and stock ID
    const log = await this.logRepo.findOne({
      where: { id },
      relations: ['feedStock'],
    });

    if (!log) throw new NotFoundException('Log not found');

    // 2. Refund the stock if the stock still exists
    if (log.feedStock) {
      log.feedStock.quantity += log.amount;
      await this.stockRepo.save(log.feedStock);
    }

    // 3. Delete the log
    await this.logRepo.delete(id);
    return { deleted: true, refunded: true };
  }
}
