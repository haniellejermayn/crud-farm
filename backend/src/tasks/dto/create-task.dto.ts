export class CreateTaskDto {
  title: string;
  dueDate?: Date;
  farmerId?: number;
  animalId?: number;
  plantId?: number;
}
