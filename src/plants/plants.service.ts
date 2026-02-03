import { Injectable } from '@nestjs/common';
import { Plant } from './entities/plant.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';

@Injectable()
export class PlantsService {
  constructor(
    @InjectRepository(Plant)
    private readonly plantRepository: Repository<Plant>,
  ) {}

  create(createPlantDto: CreatePlantDto) {
    const newPlant = this.plantRepository.create({
      name: createPlantDto.name,
      type: createPlantDto.type,
      plantedAt: createPlantDto.plantedAt ?? new Date(),
    });

    return this.plantRepository.save(newPlant);
  }

  findAll() {
    return `This action returns all plants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} plant`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updatePlantDto: UpdatePlantDto) {
    return `This action updates a #${id} plant`;
  }

  remove(id: number) {
    return `This action removes a #${id} plant`;
  }
}
