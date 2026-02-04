import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const newTask = this.taskRepository.create({
      title: createTaskDto.title,
      dueDate: createTaskDto.dueDate ? new Date(createTaskDto.dueDate) : null,
      status: createTaskDto.status,
      farmerId: createTaskDto.farmerId ?? null,
      animalId: createTaskDto.animalId ?? null,
    } as Task);

    return this.taskRepository.save(newTask);
  }

  findAll() {
    return this.taskRepository.find({
      relations: ['farmer', 'animal'],
      order: { dueDate: 'ASC' },
    });
  }

  findOne(id: number) {
    return this.taskRepository.findOne({
      where: { id },
      relations: ['farmer', 'animal'],
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.findOne(id);
    if (!task) throw new NotFoundException(`Task #${id} not found`);

    const updated = this.taskRepository.merge(task, {
      ...updateTaskDto,
      status: updateTaskDto.status ?? task.status,
      dueDate: updateTaskDto.dueDate
        ? new Date(updateTaskDto.dueDate)
        : task.dueDate,
    });

    return this.taskRepository.save(updated);
  }

  async remove(id: number) {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task #${id} not found`);
    }
    return result;
  }
}
