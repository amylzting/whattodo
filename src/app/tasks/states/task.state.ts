import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Task } from '../models/task.model';

export interface TasksState extends EntityState<Task> {
    // additional entities state properties
    selectedTaskId: number | null;
  }
   
  export const taskAdapter: EntityAdapter<Task> = createEntityAdapter<Task>();