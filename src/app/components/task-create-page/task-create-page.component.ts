import { Component, OnInit } from '@angular/core';
import {Task} from '../../models';
import {TaskDataService} from '../../services/task-data.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {NgForm} from '@angular/forms';

const defaultTask = new Task();

@Component({
  selector: 'app-task-create-page',
  templateUrl: './task-create-page.component.html',
  styleUrls: ['./task-create-page.component.scss']
})
export class TaskCreatePageComponent implements OnInit {

  static recentTaskLimit = 5;

  editTask: Task = new Task();
  recentTasks$: Observable<Task[]>;

  constructor(private taskData: TaskDataService) { }

  ngOnInit() {
    this.recentTasks$ = this.taskData.taskList$.pipe(
      map(tasks => tasks.sort((t1, t2) => t2.createAt.getTime() - t1.createAt.getTime())
        .slice(0, TaskCreatePageComponent.recentTaskLimit)
      )
    );
  }

  onCreate(form: NgForm) {
    console.log(form.value);
    const task = new Task(form.value);
    this.taskData.addTask(task);
    this.editTask = new Task();
  }
}
