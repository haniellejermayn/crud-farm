import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { Animal } from './entities/animal.entity';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal)
    private animalRepository: Repository<Animal>,
  ) {}

  create(createAnimalDto: CreateAnimalDto) {
    const newAnimal = this.animalRepository.create(createAnimalDto);
    return this.animalRepository.save(newAnimal);
  }

  findAll() {
    return this.animalRepository.find();
  }

  findOne(id: number) {
    return this.animalRepository.findOneBy({ id });
  }

  async update(id: number, updateAnimalDto: UpdateAnimalDto) {
    await this.animalRepository.update(id, updateAnimalDto);
    return this.findOne(id);
  }

  remove(id: number) {
    return `This action removes a #${id} animal`;
  }
}
