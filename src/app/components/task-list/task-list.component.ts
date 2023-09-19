import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { TaskPriority, TaskStatus } from 'src/app/enums/common.enum';
import { IGetTaskFiltersParams, IGroupSelect, ISelect, IToggle, Task } from 'src/app/interfaces';
import { SharedModule } from 'src/app/shared/shared.module';
import { TaskService } from 'src/app/services/task.service';
import { Subject, takeUntil } from 'rxjs';
import { KeysTask } from 'src/app/enums/task.enum';
import { capitalize } from 'src/utils/common.utils';
import { GetTaskWithoutFilters } from '../constants/common.constants';

@Component({
  selector: 'jb-task-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit, OnDestroy {
  public sortByOptions: IGroupSelect<string>[];
  public groupByOptions: ISelect<string>[];
  public taskState: string;
  public loading: boolean;
  public taskFormGroup: FormGroup;
  public TaskStatus = TaskStatus;
  public tasks: Task[];

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private readonly taskService: TaskService,
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
      }
    ];
    this.groupByOptions = [
      {
        label: 'Status',
        value: KeysTask.Completed,
      },
      {
        label: capitalize(KeysTask.Priority),
        value: KeysTask.Priority,
      },
      {
        label: capitalize(KeysTask.Tags),
        value: KeysTask.Tags,
      },
    ]
    this.taskState = 'pending';
    this.loading = false;
    this.taskFormGroup = this.fb.group({
      id: [null, Validators.required],
      search: [null, Validators.required],
      sortBy: [null],
      groupBy: [null],
    });
    this.tasks = [];
  }

  ngOnInit(): void {
    this.getTasks(GetTaskWithoutFilters);
  }

  getTasks(params: IGetTaskFiltersParams): void {
    this.taskService.getTasks(params)
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
      group: this.getControlValue('groupBy')?.value,
    }
    this.getTasks(params);
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  changeFilters(key: string){
    if(key === 'sort' && this.getControlValue('sortBy')) {
      this.taskFormGroup.get('groupBy')?.setValue(null);
    }
    if(key === 'group' && this.getControlValue('groupBy')?.value) {
      this.taskFormGroup.get('sortBy')?.setValue(null);
    }
  }

  getControlValue(controlName: string) {
    return this.taskFormGroup.get(controlName)?.value;
  }

  onPrioritySelected(event: DropdownChangeEvent) {
    this.taskFormGroup.get('priority')?.setValue(event.value?.code);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
