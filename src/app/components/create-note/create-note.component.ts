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
import { TaskFormGroupTemplate, priorityOptions, taskStateOptions } from '../constants/common.constants';

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
    this.priorityOptions = priorityOptions
    this.taskStateOptions = taskStateOptions
    this.taskState = TaskStatus.PENDING;
    this.loading = false;
    this.taskFormGroup = this.fb.group(TaskFormGroupTemplate);
  }

  onSubmit(): void {
    this.loading = true;
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

  onTitleChange() {
    const value = this.taskFormGroup.get('title')?.value;
    this.taskFormGroup.get('title')?.setValue((value as string)?.toLowerCase());
  }

  onChipAdd(event: any) {
    event.value = event.value.toLowerCase();
    this.taskFormGroup
      .get('tags')
      ?.setValue([...this.taskFormGroup.get('tags')?.value?.map((x: string) => x.toLowerCase())]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
