import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { environment } from '../../environments/environment';

describe('TaskService', () => {
  let service: TaskService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ TaskService ],
    });
    service = TestBed.inject(TaskService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve tasks', () => {
    const mockTasks = [
      { id: '1', title: 'Task 1' },
      { id: '2', title: 'Task 2' },
    ];

    service.getTasks().subscribe((tasks) => {
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/tasks`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockTasks);
  });

  it('should retrieve a task by id', () => {
    const mockTask = { id: '1', title: 'Task 1' };

    service.getTask('1').subscribe((task) => {
      expect(task).toEqual(mockTask);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/tasks/1`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockTask);
  });

  it('should create a task', () => {
    const newTask = { title: 'New Task' };

    service.createTask(newTask).subscribe((task) => {
      expect(task).toEqual(newTask);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/tasks`);
    expect(req.request.method).toEqual('POST');
    req.flush(newTask);
  });

  it('should update a task', () => {
    const taskId = '1';
    const updatedTask = { title: 'Updated Task' };

    service.updateTask(taskId, updatedTask).subscribe(() => {
      // Expecting no response body for a successful update
      expect(true).toBe(true);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/tasks/1`);
    expect(req.request.method).toEqual('PUT');
    req.flush({});
  });

  it('should delete a task', () => {
    const taskId = '1';

    service.deleteTask(taskId).subscribe(() => {
      // Expecting no response body for a successful delete
      expect(true).toBe(true);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/tasks/1`);
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
  });

  it('should update the completed field of a task', () => {
    const taskId = '1';
    const completedValue = true;

    service.updateCompleteTask(taskId, completedValue).subscribe(() => {
      // Expecting no response body for a successful update
      expect(true).toBe(true);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/tasks/1`);
    expect(req.request.method).toEqual('PATCH');
    req.flush({});
  });

  it('should update the archived field of a task', () => {
    const taskId = '1';
    const archivedValue = true;

    service.updateArchiveTask(taskId, archivedValue).subscribe(() => {
      // Expecting no response body for a successful update
      expect(true).toBe(true);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/tasks/1`);
    expect(req.request.method).toEqual('PATCH');
    req.flush({});
  });
});
