import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LearningTask, TaskFilter, TaskStatus } from './task.model';

export const TasksActions = createActionGroup({
  source: 'Tasks',
  events: {
    'Page Entered': emptyProps(),
    'Tasks Loaded': props<{ tasks: LearningTask[] }>(),
    'Filter Changed': props<{ filter: TaskFilter }>(),
    'Search Changed': props<{ searchTerm: string }>(),
    'Task Creation Requested': props<{ title: string; description: string }>(),
    'Task Created': props<{ task: LearningTask }>(),
    'Task Status Change Requested': props<{ id: string; status: TaskStatus }>(),
    'Task Status Changed': props<{ task: LearningTask }>(),
    'Task Deletion Requested': props<{ id: string }>(),
    'Task Deleted': props<{ id: string }>(),
    'Load Failed': props<{ error: string }>(),
    'Mutation Failed': props<{ error: string }>()
  }
});
