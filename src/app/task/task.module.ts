import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { TaskListComponent } from './components/task/tasklist.component';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { taskReducer } from './reducers/task.reducers';

@NgModule({
  declarations: [ TaskListComponent ],
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature('tasks', taskReducer)
  ],
  exports: [TaskListComponent],
})

export class TaskModule { }
