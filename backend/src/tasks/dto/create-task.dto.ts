import { TaskStatus } from '../entities/task.entity';
export class CreateTaskDto {
  title: string;
  status: TaskStatus;
  dueDate?: Date;
  farmerId?: number;
  animalId?: number;
}
