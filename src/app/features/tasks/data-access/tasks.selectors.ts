import { createSelector } from '@ngrx/store';
import { tasksAdapter, tasksFeature } from './tasks.reducer';

const { selectAll, selectEntities, selectTotal } = tasksAdapter.getSelectors(tasksFeature.selectTasksState);

export const selectAllTasks = selectAll;
export const selectTaskEntities = selectEntities;
export const selectTaskCount = selectTotal;
export const selectTasksLoading = tasksFeature.selectLoading;
export const selectTasksError = tasksFeature.selectError;
export const selectTaskFilter = tasksFeature.selectFilter;
export const selectTaskSearchTerm = tasksFeature.selectSearchTerm;

export const selectVisibleTasks = createSelector(
  selectAllTasks,
  selectTaskFilter,
  selectTaskSearchTerm,
  (tasks, filter, searchTerm) => {
    const query = searchTerm.trim().toLocaleLowerCase();
    return tasks.filter((task) => {
      const matchesFilter = filter === 'all' || task.status === filter;
      const matchesSearch = !query
        || task.title.toLocaleLowerCase().includes(query)
        || task.description.toLocaleLowerCase().includes(query);
      return matchesFilter && matchesSearch;
    });
  }
);

export const selectCompletedTaskCount = createSelector(
  selectAllTasks,
  (tasks) => tasks.filter((task) => task.status === 'done').length
);

export const selectCompletionPercentage = createSelector(
  selectTaskCount,
  selectCompletedTaskCount,
  (total, completed) => total === 0 ? 0 : Math.round((completed / total) * 100)
);
