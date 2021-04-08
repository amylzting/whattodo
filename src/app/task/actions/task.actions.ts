import { createAction, props } from '@ngrx/store';
import { Task } from '../models';
import { Update } from '@ngrx/entity';

// create actions for expressing different events on tasks

// load all tasks
export const loadTasks = createAction('[Tasks] Load Tasks', props<{ tasks: Task[] }>());

// add single task
export const addTask = createAction('[Tasks] Add Task', props<{ task: Task }>());

// edit single task
export const editTask = createAction('[Tasks] Edit Task', props<{ edit: Update<Task> }>());

// remove single task
export const removeTask = createAction('[Tasks] Delete Task', props<{ id: number }>());

// clear all tasks
export const clearTasks = createAction('[Tasks] Clear Tasks');