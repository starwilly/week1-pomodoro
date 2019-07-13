import { Injectable } from '@angular/core';
import {Task} from '../models';
import {BehaviorSubject, Observable} from 'rxjs';

const defaultTasks: Task[] = [
  {
    title: 'first todo',
    estimation: 5,
    achieveTimes: [],
    isComplete: false
  },
  {
    title: 'second todo',
    estimation: 8,
    achieveTimes: [],
    isComplete: false
  }
];

@Injectable({
  providedIn: 'root'
})
export class TaskDataService {
  private _taskList$: BehaviorSubject<Task[]> = new BehaviorSubject(defaultTasks);
  public taskList$: Observable<Task[]>;

  constructor() {
    this.taskList$ = this._taskList$.asObservable();
  }
}
