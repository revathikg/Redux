import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, exhaustMap, map, of } from 'rxjs';
import { TasksApiService } from './tasks-api.service';
import { TasksActions } from './tasks.actions';

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'An unexpected task request error occurred.';
}

@Injectable()
export class TasksEffects {
  private readonly actions$ = inject(Actions);
  private readonly api = inject(TasksApiService);

  readonly loadTasks$ = createEffect(() => this.actions$.pipe(
    ofType(TasksActions.pageEntered),
    exhaustMap(() => this.api.getTasks().pipe(
      map((tasks) => TasksActions.tasksLoaded({ tasks })),
      catchError((error: unknown) => of(TasksActions.loadFailed({ error: getErrorMessage(error) })))
    ))
  ));

  readonly createTask$ = createEffect(() => this.actions$.pipe(
    ofType(TasksActions.taskCreationRequested),
    concatMap(({ title, description }) => this.api.createTask({ title, description }).pipe(
      map((task) => TasksActions.taskCreated({ task })),
      catchError((error: unknown) => of(TasksActions.mutationFailed({ error: getErrorMessage(error) })))
    ))
  ));

  readonly updateTaskStatus$ = createEffect(() => this.actions$.pipe(
    ofType(TasksActions.taskStatusChangeRequested),
    concatMap(({ id, status }) => this.api.updateTaskStatus(id, status).pipe(
      map((task) => TasksActions.taskStatusChanged({ task })),
      catchError((error: unknown) => of(TasksActions.mutationFailed({ error: getErrorMessage(error) })))
    ))
  ));

  readonly deleteTask$ = createEffect(() => this.actions$.pipe(
    ofType(TasksActions.taskDeletionRequested),
    concatMap(({ id }) => this.api.deleteTask(id).pipe(
      map((deletedId) => TasksActions.taskDeleted({ id: deletedId })),
      catchError((error: unknown) => of(TasksActions.mutationFailed({ error: getErrorMessage(error) })))
    ))
  ));
}
