import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';

import * as TaskActions from '../../actions/task.actions';
import { TasksState } from '../../states/task.state';
import * as taskSelector from '../../selectors/task.selectors';
import { Task } from '../../models';

import {TasksSyncStorageService} from '../../services/task-sync-storage.service';

@Component({
  selector: 'tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss']
})

export class TaskListComponent implements OnInit {
  tasklist: Observable<any>

  
  @Input() newTaskDescription: string
  @Input() editedTaskDescription: string

  constructor(private store: Store<TasksState>, private syncStorage: TasksSyncStorageService) {}

  ngOnInit(): void {
    this.tasklist = this.store.select(taskSelector.selectAllTasks);
    this.syncStorage.init();
    
  }

  addTask() {
    if (this.newTaskDescription != '') {
      const task: Task = {
        id: uuid(),
        description: this.newTaskDescription,
        editing: false,
        completed: false
      };
      this.store.dispatch(TaskActions.addTask({task: task}));
      this.newTaskDescription = '';
    }
  }

  removeTask(id: number) {
    this.store.dispatch(TaskActions.removeTask({id: id}));
  }

  removeAllTasks() {
    this.store.dispatch(TaskActions.clearTasks());
  }

  cancelEdit(task: Task){
    const editedTask: Update<Task> = {
      id: task.id,
      changes: { editing: false }
    }
    this.store.dispatch(TaskActions.editTask({edit: editedTask}));
    this.editedTaskDescription = '';
  }

  editTask(task:Task) {
    if (this.editedTaskDescription != '') {
        const editedTask: Update<Task> = {
          id: task.id,
          changes: { description: this.editedTaskDescription, editing: false }
        }
        this.store.dispatch(TaskActions.editTask({edit: editedTask}));
        this.editedTaskDescription = '';
    } else {
      this.cancelEdit(task);
    }
  }

  setEdit(task: Task) {
    const editedTask: Update<Task> = {
      id: task.id,
      changes: { editing: true }
    }
    this.store.dispatch(TaskActions.editTask({edit: editedTask}));
  }

  toggleCompleteTask(task: Task) {
    const completedTask: Update<Task> = {
      id: task.id,
      changes: { completed: !task.completed }
    }
    this.store.dispatch(TaskActions.editTask({edit: completedTask}));
  }

  onKeyEdit(event) { this.editedTaskDescription = event.target.value;}

}
