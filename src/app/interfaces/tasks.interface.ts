import { TaskPriority, TaskStatus } from '../enums/common.enum';

export interface Task {
  id: string;
  title: string;
  description: string;
  creationDate: Date;
  updateDate: Date;
  dueDate: Date;
  priority: TaskPriority;
  completed: TaskStatus;
  tags: string[];
  archived: boolean;
}