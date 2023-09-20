import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Paths } from './enums';

const routes: Routes = [
  {
    path: Paths.create_task,
    loadComponent: () =>
      import('./components/create-note/create-note.component').then((m) => m.CreateNoteComponent),
  },
  {
    path: Paths.list_tasks,
    loadComponent: () =>
      import('./components/task-list/task-list.component').then((m) => m.TaskListComponent),
  },
  {
    path: Paths.edit_task,
    loadComponent: () => import('./components/edit-task/edit-task.component').then((m) => m.EditTaskComponent),
  },
  {
    path: '**',
    redirectTo: Paths.list_tasks,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
