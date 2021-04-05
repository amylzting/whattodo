import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Task } from '../models/task.model';
import * as TaskActions from '../actions/task.actions';
// import { TasksState, tasksAdapter } from '@todos/states';

export interface State extends EntityState<Task> {
  // additional entities state properties
  selectedTaskId: number | null;
}
 
export const taskAdapter: EntityAdapter<Task> = createEntityAdapter<Task>();
 
export const initialState: State = taskAdapter.getInitialState({
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
