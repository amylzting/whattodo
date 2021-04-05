import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './components/task/task.component';
import { StoreModule } from '@ngrx/store';
import { taskReducer } from './reducers/task.reducers';

@NgModule({
  declarations: [TaskComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('tasks', taskReducer)
  ]
})
export class TodoModule { }
