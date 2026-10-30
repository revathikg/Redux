import { Injectable } from '@angular/core';
import { Observable, delay, of, throwError } from 'rxjs';
import { LearningTask, NewLearningTask, TaskStatus } from './task.model';

const SAMPLE_TASKS: LearningTask[] = [
  {
    id: 'task-1',
    title: 'Understand the Redux pattern',
    description: 'Explain actions, reducers, and one-way data flow.',
    status: 'done'
  },
  {
    id: 'task-2',
    title: 'Build a feature with Entity',
    description: 'Practice normalized collections and adapter operations.',
    status: 'in-progress'
  },
  {
    id: 'task-3',
    title: 'Write an NgRx effect',
    description: 'Handle an asynchronous request and its failure action.',
    status: 'pending'
  }
];

@Injectable({ providedIn: 'root' })
export class TasksApiService {
  private tasks = [...SAMPLE_TASKS];

  getTasks(): Observable<LearningTask[]> {
    return of(this.tasks.map((task) => ({ ...task }))).pipe(delay(350));
  }

  createTask(input: NewLearningTask): Observable<LearningTask> {
    const task: LearningTask = { ...input, id: crypto.randomUUID(), status: 'pending' };
    this.tasks = [...this.tasks, task];
    return of({ ...task }).pipe(delay(200));
  }

  updateTaskStatus(id: string, status: TaskStatus): Observable<LearningTask> {
    const task = this.tasks.find((candidate) => candidate.id === id);
    if (!task) {
      return throwError(() => new Error(`Task "${id}" was not found.`));
    }

    const updatedTask = { ...task, status };
    this.tasks = this.tasks.map((candidate) => candidate.id === id ? updatedTask : candidate);
    return of({ ...updatedTask }).pipe(delay(200));
  }

  deleteTask(id: string): Observable<string> {
    if (!this.tasks.some((task) => task.id === id)) {
      return throwError(() => new Error(`Task "${id}" was not found.`));
    }

    this.tasks = this.tasks.filter((task) => task.id !== id);
    return of(id).pipe(delay(200));
  }
}
