import { Injectable } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {filter} from 'rxjs/operators';

import {TasksState} from '../states/task.state';
import {tasksFeatureSelector} from '../selectors/task.selectors';
import * as TaskActions from '../actions/task.actions';

export const TASKLIST_LOCALSTORAGE_KEY = 'tasklist';

@Injectable({
  providedIn: 'root'
})

export class TasksSyncStorageService {
  private isInit = false;

  constructor(private store$: Store<TasksState>) { }

  init() {
    if (this.isInit) {
      return;
    }

    this.isInit = true;
    // load task entities from local storage
    this.loadFromStorage();

    // saving into local storage
    this.store$.pipe(
      select(tasksFeatureSelector),
      filter(state => !!state)
    ).subscribe(state => {
      localStorage.setItem(TASKLIST_LOCALSTORAGE_KEY, JSON.stringify(state));
    });

    // load tasks from local storage, when storage changes
    window.addEventListener('storage', () => this.loadFromStorage());
  }

  // handler for loading task entities from local storage
  private loadFromStorage() {
    const storageState = localStorage.getItem(TASKLIST_LOCALSTORAGE_KEY);
    if (storageState) {
      const taskEntities = JSON.parse(storageState)["entities"];

      function isEmpty(ob){
        for(var i in ob){ return false;}
        return true;
      }

      // check if there are task entities, then load
      if(!isEmpty(taskEntities)) {
          this.store$.dispatch(TaskActions.loadTasks({
              tasks: JSON.parse(JSON.stringify(Object.values(taskEntities)))
          }));
      }
    }
    
  }
  
}