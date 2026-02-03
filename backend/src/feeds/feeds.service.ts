import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
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

  async updateStock(id: number, dto: Partial<CreateFeedStockDto>) {
    await this.stockRepo.update(id, dto);
    return this.stockRepo.findOneBy({ id });
  }

  async removeStock(id: number) {
    const logsCount = await this.logRepo.count({
      where: { feedStockId: id },
    });

    if (logsCount > 0) {
      throw new ConflictException(
        'Cannot delete feed stock because it has associated feeding logs. Please delete the logs first.',
      );
    }

    await this.stockRepo.delete(id);
    return { deleted: true };
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
      take: 20,
    });
  }

  async removeLog(id: number) {
    const log = await this.logRepo.findOne({
      where: { id },
      relations: ['feedStock'],
    });

    if (!log) throw new NotFoundException('Log not found');

    if (log.feedStock) {
      log.feedStock.quantity += log.amount;
      await this.stockRepo.save(log.feedStock);
    }

    await this.logRepo.delete(id);
    return { deleted: true, refunded: true };
  }
}
