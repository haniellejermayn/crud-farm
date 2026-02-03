export enum TaskStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export interface Animal {
  id: number;
  name: string;
  type: string;
  isHealthy: boolean;
}

export interface Farmer {
  id: number;
  name: string;
  role: string;
}

export interface Feed {
  id: number;
  name: string;
  quantity: number;
  animalId: number;
  animal?: Animal;
}

export interface Plant {
  id: number;
  name: string;
  type: string;
  plantedAt: string;
  isReadyToHarvest: boolean;
}

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  dueDate?: string;
  farmerId?: number;
  animalId?: number;
  plantId?: number;
  farmer?: Farmer;
  animal?: Animal;
  plant?: Plant;
}
