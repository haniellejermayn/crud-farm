import { Injectable } from '@nestjs/common';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { UpdateFarmerDto } from './dto/update-farmer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Farmer } from './entities/farmer.entity';

@Injectable()
export class FarmersService {
  constructor(
    @InjectRepository(Farmer)
    private readonly farmerRepository: Repository<Farmer>,
  ) {}

  create(createFarmerDto: CreateFarmerDto) {
    return this.farmerRepository.save(createFarmerDto);
  }

  findAll() {
    return this.farmerRepository.find();
  }

  findOne(id: number) {
    return this.farmerRepository.findOneBy({ id });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateFarmerDto: UpdateFarmerDto) {
    return `This action updates a #${id} farmer`;
  }

  remove(id: number) {
    return this.farmerRepository.delete(id);
  }
}
