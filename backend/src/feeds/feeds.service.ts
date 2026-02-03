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

  findAllStock() {
    return this.stockRepo.find();
  }

  addStock(dto: CreateFeedStockDto) {
    const stock = this.stockRepo.create(dto);
    return this.stockRepo.save(stock);
  }

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

    stock.quantity -= dto.amount;
    await this.stockRepo.save(stock);

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
      take: 10,
    });
  }
}
