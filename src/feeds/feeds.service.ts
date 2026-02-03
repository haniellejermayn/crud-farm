import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';
import { Feed } from './entities/feed.entity';

@Injectable()
export class FeedsService {
  constructor(
    @InjectRepository(Feed)
    private readonly feedRepository: Repository<Feed>,
  ) {}

  create(createFeedDto: CreateFeedDto) {
    const newFeed = this.feedRepository.create({
      name: createFeedDto.name,
      quantity: createFeedDto.quantity,
      animalId: createFeedDto.animalId,
    });

    return this.feedRepository.save(newFeed);
  }

  findAll() {
    return this.feedRepository.find({
      relations: ['animal'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} feed`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateFeedDto: UpdateFeedDto) {
    return `This action updates a #${id} feed`;
  }

  remove(id: number) {
    return `This action removes a #${id} feed`;
  }
}
