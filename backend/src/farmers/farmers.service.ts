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

  create(data: any) {
    const farmer = this.farmerRepository.create(data);
    return this.farmerRepository.save(farmer);
  }
}
