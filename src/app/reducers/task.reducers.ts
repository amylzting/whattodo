import { Action, createReducer, on } from '@ngrx/store';

import * as TaskActions from '../actions/task.actions';
import { TasksState, taskAdapter } from '../states/task.state';
 
export const initialState: TasksState = taskAdapter.getInitialState({
  // additional entity state properties
  selectedTaskId: null,
});

const userReducer = createReducer(
    initialState,
    on(TaskActions.addTask, (state, { task }) => {
      return taskAdapter.addOne(task, state)
    }),
    on(TaskActions.editTask, (state, { edit }) => {
      return taskAdapter.updateOne(edit, state);
    }),
    on(TaskActions.removeTask, (state, { id }) => {
      return taskAdapter.removeOne(id, state);
    }),
    on(TaskActions.loadTasks, (state, { tasks }) => {
      return taskAdapter.setAll(tasks, state);
    }),
    on(TaskActions.clearTasks, state => {
      return taskAdapter.removeAll({ ...state, selectedTaskId: null });
    })
);

export function taskReducer(state: TasksState | undefined, action: Action) {
  return userReducer(state, action);
}
 
export const getSelectedTaskId = (state: TasksState) => state.selectedTaskId;
 
// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = taskAdapter.getSelectors();
 
// select the array of task ids
export const selectTaskIds = selectIds;
 
// select the dictionary of task entities
export const selectTaskEntities = selectEntities;
 
// select the array of task entities
export const selectAllTasks = selectAll;
 
// select the total number of task entities
export const selectTaskTotal = selectTotal;
