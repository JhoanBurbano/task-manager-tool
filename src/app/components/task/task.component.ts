import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import * as moment from 'moment';
import { capitalizeAll } from 'src/utils/common.utils';
import { ButtonModule } from 'primeng/button';
import { ActionsTask } from 'src/app/enums/common.enum';

@Component({
  selector: 'jb-task',
  standalone: true,
  imports: [CommonModule, CardModule, ChipModule, ButtonModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input('dueDate') set setDueDate(value: Date) {
    this.date = value ? moment(value).format('DD MMM YYYY') : '';
  }
  public date!: string;
  @Input('priority') set setPriority(value: string) {
    this.priority = value ? capitalizeAll(value) : '';
  }
  public priority!: string;
  @Input() completed!: string;
  @Input() tags!: Array<string>;
  @Input() archived!: boolean;
  @Input() size!: string;
  @Input() showControls: boolean = false;
  @Output() action: EventEmitter<ActionsTask>;
  public hover: string = 'red';
  public capitalizeAll = capitalizeAll;
  public ActionsTask = ActionsTask;
  
  constructor() {
    this.action = new EventEmitter<ActionsTask>();
  }
  
  public toggleHover(key: string): void {
    this.hover = key;
  }
  emitEvent (actionKey: ActionsTask): void {
    this.action.emit(actionKey);
  }


}
