import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { LearningTask, TaskFilter } from './task.model';
import { TasksActions } from './tasks.actions';

export interface TasksState extends EntityState<LearningTask> {
  loading: boolean;
  error: string | null;
  filter: TaskFilter;
  searchTerm: string;
}

export const tasksAdapter = createEntityAdapter<LearningTask>({
  sortComparer: (first, second) => first.title.localeCompare(second.title)
});

const initialState: TasksState = tasksAdapter.getInitialState({
  loading: false,
  error: null,
  filter: 'all',
  searchTerm: ''
});

export const tasksFeature = createFeature({
  name: 'tasks',
  reducer: createReducer(
    initialState,
    on(TasksActions.pageEntered, (state) => ({ ...state, loading: true, error: null })),
    on(TasksActions.tasksLoaded, (state, { tasks }) =>
      tasksAdapter.setAll(tasks, { ...state, loading: false, error: null })),
    on(TasksActions.filterChanged, (state, { filter }) => ({ ...state, filter })),
    on(TasksActions.searchChanged, (state, { searchTerm }) => ({ ...state, searchTerm })),
    on(TasksActions.taskCreationRequested, TasksActions.taskStatusChangeRequested, TasksActions.taskDeletionRequested,
      (state) => ({ ...state, loading: true, error: null })),
    on(TasksActions.taskCreated, (state, { task }) =>
      tasksAdapter.addOne(task, { ...state, loading: false, error: null })),
    on(TasksActions.taskStatusChanged, (state, { task }) =>
      tasksAdapter.updateOne({ id: task.id, changes: { status: task.status } }, { ...state, loading: false, error: null })),
    on(TasksActions.taskDeleted, (state, { id }) =>
      tasksAdapter.removeOne(id, { ...state, loading: false, error: null })),
    on(TasksActions.loadFailed, TasksActions.mutationFailed, (state, { error }) =>
      ({ ...state, loading: false, error }))
  )
});
