import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { ActionsTask, TaskPriority, TaskStatus } from 'src/app/enums/common.enum';
import { IGetTaskFiltersParams, IGroupSelect, Task } from 'src/app/interfaces';
import { SharedModule } from 'src/app/shared/shared.module';
import { TaskService } from 'src/app/services/task.service';
import { Subject, takeUntil } from 'rxjs';
import { KeysTask } from 'src/app/enums/task.enum';
import { capitalize } from 'src/utils/common.utils';
import { GetTaskWithoutFilters } from '../constants/common.constants';
import { RedirectsService } from 'src/app/services/redirects.service';
import { Paths } from 'src/app/enums';

@Component({
  selector: 'jb-task-list',
  standalone: true,
  imports: [ CommonModule, SharedModule ],
  templateUrl: './task-list.component.html',
  styleUrls: [ './task-list.component.scss' ],
})
export class TaskListComponent implements OnInit, OnDestroy {
  public sortByOptions: IGroupSelect<string>[];
  public filterByOptions: IGroupSelect<string>[];
  public taskState: string;
  public loading: boolean;
  public taskFormGroup: FormGroup;
  public TaskStatus = TaskStatus;
  public tasks: Task[];

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private readonly taskService: TaskService,
    private readonly redirectsService: RedirectsService,
  ) {
    this.sortByOptions = [
      {
        label: capitalize(KeysTask.Priority),
        value: 'priority',
        items: [
          {
            label: capitalize(TaskPriority.LOW),
            value: KeysTask.Priority + ':desc',
          },
          {
            label: capitalize(TaskPriority.HIGH),
            value: KeysTask.Priority + ':asc',
          },
        ],
      },
      {
        label: 'Alphabetic',
        value: 'Alphabetic',
        items: [
          {
            label: 'A-Z',
            value: KeysTask.Title + ':asc',
          },
          {
            label: 'Z-A',
            value: KeysTask.Title + ':desc',
          },
        ],
      },
    ];
    this.filterByOptions = [
      {
        label: capitalize('Status'),
        value: KeysTask.Completed,
        items: [
          {
            label: capitalize(TaskStatus.PENDING),
            value: `${KeysTask.Completed}:${TaskStatus.PENDING}`,
          },
          {
            label: capitalize(TaskStatus.COMPLETED),
            value:  `${KeysTask.Completed}:${TaskStatus.COMPLETED}`,
          },
        ],
      },
      {
        label: capitalize(KeysTask.Priority),
        value: KeysTask.Priority,
        items: [
          {
            label: capitalize(TaskPriority.LOW),
            value:`${KeysTask.Priority}:${TaskPriority.LOW}`,
          },
          {
            label: capitalize(TaskPriority.MEDIUM),
            value:`${KeysTask.Priority}:${TaskPriority.MEDIUM}`,
          },
          {
            label: capitalize(TaskPriority.HIGH),
            value: `${KeysTask.Priority}:${TaskPriority.HIGH}`,
          },
        ],
      },
    ];
    this.taskState = 'pending';
    this.loading = false;
    this.taskFormGroup = this.fb.group({
      search: [ null ],
      sortBy: [ null ],
      filterBy: [ null ],
    });
    this.tasks = [];
  }

  ngOnInit(): void {
    this.getTasks(GetTaskWithoutFilters);
  }

  getTasks(params: IGetTaskFiltersParams): void {
    this.taskService
      .getTasks(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe((tasks) => {
        this.tasks = tasks;
      });
  }

  onSubmit(): void {
    this.loading = true;
    console.log('object :>> ', this.taskFormGroup.value);
    const params: IGetTaskFiltersParams = {
      search: this.getControlValue('search'),
      sort: this.getControlValue('sortBy'),
      filter: this.getControlValue('filterBy')?.value,
    };
    this.getTasks(params);
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  changeFilters(key: string) {
    if (key === 'sort' && this.getControlValue('sortBy')) {
      this.taskFormGroup.get('filterBy')?.setValue(null);
      return this.taskFormGroup.get('search')?.setValue(null);
    }
    if (key === 'filter' && this.getControlValue('filterBy')?.value) {
      this.taskFormGroup.get('sortBy')?.setValue(null);
      return this.taskFormGroup.get('search')?.setValue(null);
    }
    if (key === 'search' && this.getControlValue('search')) {
      this.taskFormGroup.get('sortBy')?.setValue(null);
      this.taskFormGroup.get('filterBy')?.setValue(null);
    }
  }

  getControlValue(controlName: string) {
    return this.taskFormGroup.get(controlName)?.value;
  }

  onPrioritySelected(event: DropdownChangeEvent) {
    this.taskFormGroup.get('priority')?.setValue(event.value?.code);
  }

  onAction(action: ActionsTask, taskId: string) {
    switch(action){
    case ActionsTask.EDIT:
      return this.onEdit(taskId);
    case ActionsTask.DELETE:
      return this.onDelete(taskId);
    default:
      return;
    }
  }

  onEdit(taskId: string) {
    this.taskService.taskBehaviorSubject.next(taskId);
    this.redirectsService.redirectTo(Paths.edit_task);
  }

  onDelete(taskId: string) {
    this.taskService
      .deleteTask(taskId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.onSubmit();
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
