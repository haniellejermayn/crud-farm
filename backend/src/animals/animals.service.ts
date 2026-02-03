import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from './entities/animal.entity';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal)
    private animalRepository: Repository<Animal>,
  ) {}

  findAll() {
    return this.animalRepository.find();
  }

  findOne(id: number) {
    return this.animalRepository.findOneBy({ id });
  }

  create(createAnimalDto: any) {
    const animal = this.animalRepository.create(createAnimalDto);
    return this.animalRepository.save(animal);
  }
}
