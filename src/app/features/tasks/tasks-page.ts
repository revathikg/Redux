import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LearningTask, TaskFilter, TaskStatus } from './data-access/task.model';
import { TasksActions } from './data-access/tasks.actions';
import {
  selectCompletionPercentage,
  selectCompletedTaskCount,
  selectTaskCount,
  selectTaskFilter,
  selectTasksError,
  selectTasksLoading,
  selectTaskSearchTerm,
  selectVisibleTasks
} from './data-access/tasks.selectors';

@Component({
  selector: 'app-tasks-page',
  imports: [FormsModule],
  templateUrl: './tasks-page.html',
  styleUrl: './tasks-page.css'
})
export class TasksPage {
  private readonly store = inject(Store);

  readonly tasks = this.store.selectSignal(selectVisibleTasks);
  readonly totalCount = this.store.selectSignal(selectTaskCount);
  readonly completedCount = this.store.selectSignal(selectCompletedTaskCount);
  readonly completionPercentage = this.store.selectSignal(selectCompletionPercentage);
  readonly loading = this.store.selectSignal(selectTasksLoading);
  readonly error = this.store.selectSignal(selectTasksError);
  readonly filter = this.store.selectSignal(selectTaskFilter);
  readonly searchTerm = this.store.selectSignal(selectTaskSearchTerm);

  readonly filters: { label: string; value: TaskFilter }[] = [
    { label: 'All', value: 'all' },
    { label: 'To do', value: 'pending' },
    { label: 'In progress', value: 'in-progress' },
    { label: 'Done', value: 'done' }
  ];

  constructor() {
    this.store.dispatch(TasksActions.pageEntered());
  }

  addTask(form: NgForm): void {
    const title = String(form.value.title ?? '').trim();
    const description = String(form.value.description ?? '').trim();
    if (!title) {
      return;
    }

    this.store.dispatch(TasksActions.taskCreationRequested({ title, description }));
    form.resetForm();
  }

  setFilter(filter: TaskFilter): void {
    this.store.dispatch(TasksActions.filterChanged({ filter }));
  }

  updateSearch(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.store.dispatch(TasksActions.searchChanged({ searchTerm: event.target.value }));
    }
  }

  markDone(task: LearningTask): void {
    const status: TaskStatus = task.status === 'done' ? 'pending' : 'done';
    this.store.dispatch(TasksActions.taskStatusChangeRequested({ id: task.id, status }));
  }

  deleteTask(id: string): void {
    this.store.dispatch(TasksActions.taskDeletionRequested({ id }));
  }
}
