import { createAction, props } from '@ngrx/store';
import { Task } from '../models';
import { Update } from '@ngrx/entity';

export const loadTasks = createAction('[Task/API] Load Tasks', props<{ tasks: Task[] }>());
export const addTask = createAction('[Task/API] Add Task', props<{ task: Task }>());
export const editTask = createAction('[Task/API] Edit Task', props<{ edit: Update<Task> }>());
export const removeTask = createAction('[Task/API] Delete Task', props<{ id: number }>());
export const clearTasks = createAction('[Task/API] Clear Tasks');