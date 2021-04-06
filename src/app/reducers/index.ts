import { ActionReducerMap } from '@ngrx/store';
import { taskReducer } from '../task/reducers/task.reducers';

export const reducers: ActionReducerMap<any> = {
    tasks: taskReducer
}