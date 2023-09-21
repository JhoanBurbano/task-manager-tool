import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IGetTaskFiltersParams, Task } from '../interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private url = environment.apiUrl;
  public taskBehaviorSubject: BehaviorSubject<string>;
  public task$: Observable<string>;
  constructor(private http: HttpClient, private readonly messageService: MessageService) {
    this.taskBehaviorSubject = new BehaviorSubject<string>('');
    this.task$ = this.taskBehaviorSubject.asObservable();
  }


  onErrorAlert(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  onSuccessAlert(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  onInfoAlert(message: string) {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: message });
  }


  getTasks({ search, sort, filter }: IGetTaskFiltersParams): Observable<Task[]> {
    let params = new HttpParams();

    if (search) {
      params = params.set('search', search);
    }

    if (sort) {
      params = params.set('sort', sort);
    }

    if (filter) {
      params = params.set('filter', filter);
    }

    console.log('params :>> ', params);

    return this.http.get<Task[]>(`${this.url}/tasks`, { params });
  }

  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.url}/tasks/${id}`);
  }

  createTask(task: Task): Observable<{ taskId: string }> {
    return this.http.post<{ taskId: string }>(`${this.url}/tasks`, task);
  }

  updateTask(id: string, task: Partial<Task>): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.url}/tasks/${id}`, task);
  }

  deleteTask(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.url}/tasks/${id}`);
  }

  updateCompleteTask(taskId: string, value: boolean): Observable<{ message: string }> {
    return this.http.patch<{ message: string }>(`${this.url}/tasks/${taskId}`, {
      field: 'completed',
      value,
    });
  }

  updateArchiveTask(taskId: string, value: boolean) {
    return this.http.patch(`${this.url}/tasks/${taskId}`, { field: 'archived', value });
  }
}
