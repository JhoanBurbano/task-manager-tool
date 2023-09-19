import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import * as moment from 'moment';

@Component({
  selector: 'jb-task',
  standalone: true,
  imports: [CommonModule, CardModule, ChipModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input('dueDate') set setDueDate(value: Date) {
    this.date = value ? moment(value).format('DD MMM YYYY') : '';
  }
  @Input() date!: string;
  @Input() priority!: string;
  @Input() completed!: string;
  @Input() tags!: Array<string>;
  @Input() archived!: boolean;
  @Input() size!: string;
}
