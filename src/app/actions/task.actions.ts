import { createAction, props } from '@ngrx/store';
import { Task } from '../models';
import { Update } from '@ngrx/entity';

export const loadTasks = createAction('[Task/API] Load Tasks', props<{ users: Task[] }>());
export const addTask = createAction('[Task/API] Add Task', props<{ user: Task }>());
export const editTask = createAction('[Task/API] Edit Task', props<{ update: Update<Task> }>());
export const deleteTask = createAction('[Task/API] Delete Task', props<{ id: number }>());
export const clearTasks = createAction('[Task/API] Clear Tasks');