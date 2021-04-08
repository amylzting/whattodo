import { Component, Input, OnInit} from '@angular/core';
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
  imgAsDataUrl = new Array<string>();
  uploadingIds = new Array<number>();

  constructor(private store: Store<TasksState>, private syncStorage: TasksSyncStorageService) {}

  ngOnInit(): void {
    this.tasklist = this.store.select(taskSelector.selectAllTasks);
    // sync for local storage
    this.syncStorage.init();  
  }

  // handler for adding a task, unique id is created for each task
  addTask() {
    if (this.newTaskDescription != '') {
      const task: Task = {
        id: uuid(),
        description: this.newTaskDescription,
        editing: false,
        completed: false,
        imageUrl: ''
      };
      this.store.dispatch(TaskActions.addTask({task: task}));
      this.newTaskDescription = '';
    }
  }

  // handler for removing a task
  removeTask(id: number) {
    this.store.dispatch(TaskActions.removeTask({id: id}));
  }

  // handler for removing all tasks
  removeAllTasks() {
    this.store.dispatch(TaskActions.clearTasks());
  }

  // sets task attribute:editing to true
  setEdit(task: Task) {
    console.log("task desc: " + task.id);
    const editedTask: Update<Task> = {
      id: task.id,
      changes: { editing: true }
    }
    this.store.dispatch(TaskActions.editTask({edit: editedTask}));
  }

  // handler for cancelling task edit, sets task attribute:editing to false
  cancelEdit(task: Task){
    const editedTask: Update<Task> = {
      id: task.id,
      changes: { editing: false }
    }
    this.store.dispatch(TaskActions.editTask({edit: editedTask}));
    this.editedTaskDescription = '';
  }

  // handler for editing task
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

  // handler for task completion or non-completion
  toggleCompleteTask(task: Task) {
    const completedTask: Update<Task> = {
      id: task.id,
      changes: { completed: !task.completed }
    }
    this.store.dispatch(TaskActions.editTask({edit: completedTask}));
  }

  // listens to edit event and gets edit text
  onKeyEdit(event) { this.editedTaskDescription = event.target.value;}

  // stores id of task to upload image
  setUploading(task: Task) {
    this.uploadingIds.push(task.id);
  }

  // handler for uploading image for task
  addImage(event) {
    if(event.target.files) {
      var reader = new FileReader();
      reader.onload=(e:any)=>{
        this.imgAsDataUrl.push(e.target.result);
        const taskWithImage: Update<Task> = {
          id: this.uploadingIds.shift(),
          changes: { imageUrl: this.imgAsDataUrl.shift() }
        }
        this.store.dispatch(TaskActions.editTask({edit: taskWithImage}));
        window.location.reload();
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }

}
