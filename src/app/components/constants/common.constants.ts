import { Validators } from '@angular/forms';
import { TaskPriority, TaskStatus } from 'src/app/enums/common.enum';
import { IGetTaskFiltersParams } from 'src/app/interfaces';

export const GetTaskWithoutFilters: IGetTaskFiltersParams = {
  search: '',
  sort: '',
  filter: '',
};

export const priorityOptions = [
  {
    label: 'Low',
    value: TaskPriority.LOW,
  },
  {
    label: 'Medium',
    value: TaskPriority.MEDIUM,
  },
  {
    label: 'High',
    value: TaskPriority.HIGH,
  },
];
export const taskStateOptions = [
  {
    label: TaskStatus.PENDING,
    value: TaskStatus.PENDING,
  },
  {
    label: TaskStatus.COMPLETED,
    value: TaskStatus.COMPLETED,
  },
];

export const TaskFormGroupTemplate = {
  id: [ '', Validators.required ],
  title: [ '', Validators.required ],
  description: [ '' ],
  creationDate: [ new Date() ],
  updateDate: [ new Date() ],
  dueDate: [ null ],
  priority: [ TaskPriority.LOW, Validators.min(0) ],
  completed: [ TaskStatus.PENDING ],
  tags: [ [] ],
  archived: [ false ],
};