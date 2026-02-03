import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Farmer } from './entities/farmer.entity';

@Injectable()
export class FarmersService {
  constructor(
    @InjectRepository(Farmer)
    private farmerRepository: Repository<Farmer>,
  ) {}

  findAll() {
    return this.farmerRepository.find();
  }

  findOne(id: number) {
    return this.farmerRepository.findOneBy({ id });
  }

  create(data: any) {
    const farmer = this.farmerRepository.create(data);
    return this.farmerRepository.save(farmer);
  }

  async update(id: number, data: any) {
    await this.farmerRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.farmerRepository.delete(id);
    return { deleted: true };
  }
}
