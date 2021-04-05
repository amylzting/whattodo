import { TasksState, taskAdapter } from '../states/task.state';
   
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