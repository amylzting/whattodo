import { TasksState, taskAdapter } from '../states/task.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
   
// create selector for obtaining slices of store state for tasks
export const tasksFeatureSelector = createFeatureSelector<TasksState>('tasks');

  // get the selectors
  const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = taskAdapter.getSelectors();
   
  // select the array of task ids
  export const selectTaskIds = createSelector(tasksFeatureSelector, selectIds);
   
  // select the dictionary of task entities
  export const selectTaskEntities = createSelector(tasksFeatureSelector, selectEntities);
   
  // select the array of task entities
  export const selectAllTasks = createSelector(tasksFeatureSelector, selectAll);
   
  // select the total number of task entities
  export const selectTaskTotal = createSelector(tasksFeatureSelector, selectTotal);