import { Injectable } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {TasksState} from '../states/task.state';
import {tasksFeatureSelector} from '../selectors/task.selectors';
import {filter, take} from 'rxjs/operators';
import * as TaskActions from '../actions/task.actions';
import { Task } from '../models';

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
    this.loadFromStorage();

    this.store$.pipe(
      select(tasksFeatureSelector),
      filter(state => !!state)
    ).subscribe(state => {
      localStorage.setItem(TASKLIST_LOCALSTORAGE_KEY, JSON.stringify(state));
    });

    window.addEventListener('storage', () => this.loadFromStorage());
  }

  private loadFromStorage() {
    const storageState = localStorage.getItem(TASKLIST_LOCALSTORAGE_KEY);
    if (storageState) {
      const taskEntities = JSON.parse(storageState)["entities"];

      function isEmpty(ob){
        for(var i in ob){ return false;}
        return true;
      }
      if(!isEmpty(taskEntities)) {
          this.store$.dispatch(TaskActions.loadTasks({
              tasks: JSON.parse(JSON.stringify(Object.values(taskEntities)))
          }));
      }
    }
    
  }
  
}