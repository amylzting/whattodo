import { ActionReducerMap } from '@ngrx/store';
import { taskReducer } from '../task/reducers/task.reducers';

// all reducers in application
export const reducers: ActionReducerMap<any> = {
    tasks: taskReducer
}