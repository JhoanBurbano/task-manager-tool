import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTemplateComponent } from './templates/page-template/page-template.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TreeSelectModule } from 'primeng/treeselect';
import { TaskComponent } from '../components/task/task.component';

@NgModule({
  declarations: [PageTemplateComponent],
  exports: [
    PageTemplateComponent,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    ChipsModule,
    CalendarModule,
    TaskComponent,
    SelectButtonModule,
    ButtonModule,
    TreeSelectModule,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    ChipsModule,
    CalendarModule,
    TaskComponent,
    SelectButtonModule,
    ButtonModule,
  ],
})
export class SharedModule {}
