import {Injectable} from '@angular/core';
import {Task} from '../models';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';

const defaultTasks: Task[] = [
  new Task({
      title: 'first todo',
      estimation: 5,
    },
  ),
  new Task({
    title: 'first todo',
    estimation: 5,
    isComplete: false
  }),
  new Task(
    {
      title: 'first todo',
      estimation: 5,
      workHistory: [
        new Date('2019-07-18'),
        new Date('2019-07-18'),
        new Date('2019-07-18'),
        new Date('2019-07-18'),
        new Date('2019-07-20'),
      ]
    }),
  new Task({
    title: 'first todo',
    estimation: 5,
    workHistory: [
      new Date('2019-07-13'),
    ]
  }),
  new Task({
    title: 'second todo',
    estimation: 8,
  })
];

@Injectable({
  providedIn: 'root'
})
export class TaskDataService {
  private _taskList$: BehaviorSubject<Task[]> = new BehaviorSubject(defaultTasks);
  public taskList$: Observable<Task[]>;

  private _selectedTask$ = new ReplaySubject<Task>(1);
  public selectedTask$: Observable<Task>;

  constructor() {
    this.taskList$ = this._taskList$.asObservable();
    this.selectedTask$ = this._selectedTask$.asObservable();
  }

  addTask(task: Task) {
    const tasks = this._taskList$.value;
    tasks.push(task);
    this._taskList$.next(tasks);
  }

  updateTask(task: Task) {
    const index = this._taskList$.value.findIndex(t => t.id === task.id);
    console.log(index, this._taskList$.value);
    const tasks = this._taskList$.value;
    tasks.splice(index, 1, task);
    this._taskList$.next(tasks);
  }

  selectTask(task: Task) {
    this._selectedTask$.next(task);
  }
}
