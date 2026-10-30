import { LearningTask } from './task.model';
import { TasksActions } from './tasks.actions';
import { tasksFeature } from './tasks.reducer';
import {
  selectCompletionPercentage,
  selectVisibleTasks
} from './tasks.selectors';

const sampleTasks: LearningTask[] = [
  { id: 'one', title: 'Selectors', description: 'Memoized derived state', status: 'done' },
  { id: 'two', title: 'Effects', description: 'Async work', status: 'pending' }
];

describe('tasks feature', () => {
  it('stores loaded tasks and ends the loading state', () => {
    const loadingState = tasksFeature.reducer(undefined, TasksActions.pageEntered());
    const state = tasksFeature.reducer(loadingState, TasksActions.tasksLoaded({ tasks: sampleTasks }));

    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.ids).toHaveLength(2);
    expect(state.entities['one']).toEqual(sampleTasks[0]);
  });

  it('updates task status immutably', () => {
    const loadedState = tasksFeature.reducer(undefined, TasksActions.tasksLoaded({ tasks: sampleTasks }));
    const state = tasksFeature.reducer(
      loadedState,
      TasksActions.taskStatusChanged({ task: { ...sampleTasks[1], status: 'done' } })
    );

    expect(state.entities['two']?.status).toBe('done');
    expect(loadedState.entities['two']?.status).toBe('pending');
  });

  it('derives filtered and searched tasks', () => {
    const visibleTasks = selectVisibleTasks.projector(sampleTasks, 'pending', 'ASYNC');

    expect(visibleTasks).toEqual([sampleTasks[1]]);
    expect(selectCompletionPercentage.projector(2, 1)).toBe(50);
    expect(selectCompletionPercentage.projector(0, 0)).toBe(0);
  });
});
