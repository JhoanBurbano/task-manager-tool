import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ISelect, IToggle } from 'src/app/interfaces';
import { TaskPriority, TaskStatus } from 'src/app/enums/common.enum';
import { SharedModule } from 'src/app/shared/shared.module';
import { Subject, takeUntil } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { RedirectsService } from 'src/app/services/redirects.service';
import { Paths } from 'src/app/enums';

@Component({
  selector: 'jb-create-note',
  standalone: true,
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
})
export class CreateNoteComponent implements OnDestroy {
  public priorityOptions: ISelect<TaskPriority>[];
  public taskStateOptions: IToggle<TaskStatus>[];
  public taskState: string;
  public loading: boolean;
  public taskFormGroup: FormGroup;
  public TaskStatus = TaskStatus;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private readonly taskService: TaskService,
    private readonly redirectService: RedirectsService,
  ) {
    this.priorityOptions = [
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
    this.taskStateOptions = [
      {
        label: TaskStatus.PENDING,
        value: TaskStatus.PENDING,
      },
      {
        label: TaskStatus.COMPLETED,
        value: TaskStatus.COMPLETED,
      },
    ];
    this.taskState = 'pending';
    this.loading = false;
    this.taskFormGroup = this.fb.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      description: [''],
      creationDate: [new Date()],
      updateDate: [new Date()],
      dueDate: [null],
      priority: [TaskPriority.LOW, Validators.min(0)],
      completed: [TaskStatus.PENDING],
      tags: [[]],
      archived: [false],
    });
    console.log('this. :>> ', this.taskFormGroup.value);
  }

  onSubmit(): void {
    this.loading = true;
    console.log('this. :>> ', this.taskFormGroup.value);
    this.taskService
      .createTask(this.taskFormGroup.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((taskId) => {
        console.log('taskId :>> ', taskId);
        this.loading = false;
        this.redirectService.redirectTo(Paths.list_tasks);
      });
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
