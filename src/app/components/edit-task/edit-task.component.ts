import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { TaskService } from 'src/app/services/task.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Task } from 'src/app/interfaces';
import { Subject, takeUntil } from 'rxjs';
import { TaskFormGroupTemplate, priorityOptions, taskStateOptions } from '../constants/common.constants';
import { TaskStatus } from 'src/app/enums/common.enum';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { Paths } from 'src/app/enums/paths.enum';
import { RedirectsService } from 'src/app/services/redirects.service';

@Component({
  selector: 'jb-edit-task',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit, OnDestroy {
  public taskFormGroup: FormGroup;
  public loading: boolean;
  public TaskStatus = TaskStatus;
  public priorityOptions = priorityOptions;
  public taskStateOptions = taskStateOptions
  private task!: Task;

  private destroy$ = new Subject<void>();

  constructor( private readonly fb: FormBuilder ,private taskService: TaskService, private redirectService: RedirectsService) {
    this.taskFormGroup = this.fb.group(TaskFormGroupTemplate);
    this.loading = false;
  }

  ngOnInit(): void {
    this.taskService.task$
    .pipe(takeUntil(this.destroy$))
    .subscribe((taskId: string) => {
      if(!taskId) {
        this.redirectService.redirectTo(Paths.list_tasks);
        this.taskService.onErrorAlert('Task not found')
      }
      this.getTaskById(taskId);
    })
  }

  private getTaskById(id: string): void {
    this.taskService.getTask(id).subscribe((task: Task) => {
      this.task = task;
      this.taskFormGroup.patchValue({
        title: task.title,
        description: task.description,
        priority: priorityOptions.find((x) => x.value.toLowerCase() === task.priority.toLowerCase()),
        completed: task.completed,
        dueDate: new Date(task.dueDate),
        tags: task.tags,
      });
    });
  }

  onSubmit(): void {
    this.loading = true;
    const body = this.taskFormGroup.value
    if(typeof body.priority !== 'string') body.priority = body.priority.value;
    if(typeof body.completed !== 'string') body.completed = body.completed.value;
    this.taskService
      .updateTask(this.task.id , body as Task)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.taskService.onSuccessAlert('Task updated successfully')
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
