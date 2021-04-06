import { createAction, props } from '@ngrx/store';
import { Task } from '../models';
import { Update } from '@ngrx/entity';

export const loadTasks = createAction('[Tasks] Load Tasks', props<{ tasks: Task[] }>());
export const addTask = createAction('[Tasks] Add Task', props<{ task: Task }>());
export const editTask = createAction('[Tasks] Edit Task', props<{ edit: Update<Task> }>());
export const removeTask = createAction('[Tasks] Delete Task', props<{ id: number }>());
export const clearTasks = createAction('[Tasks] Clear Tasks');
export const addManyTasks = createAction('[Tasks] Add Multiple', props<{ tasks: Task[]}>());