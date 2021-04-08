import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Task } from '../models/task.model';

export interface TasksState extends EntityState<Task> {
    // additional entities state properties
};

// create entity state adapter for tasks
export const taskAdapter: EntityAdapter<Task> = createEntityAdapter<Task>();

const tasksDefaultState: TasksState = {
    ids: [],
    entities: {}
};

export const initialState: TasksState = taskAdapter.getInitialState(
    tasksDefaultState
);