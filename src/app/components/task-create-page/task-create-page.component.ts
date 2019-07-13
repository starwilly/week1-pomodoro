import { Component, OnInit } from '@angular/core';
import {Task} from '../../models';
import {TaskDataService} from '../../services/task-data.service';

const defaultTask = new Task();

@Component({
  selector: 'app-task-create-page',
  templateUrl: './task-create-page.component.html',
  styleUrls: ['./task-create-page.component.scss']
})
export class TaskCreatePageComponent implements OnInit {

  task: Task = new Task();

  constructor(private taskData: TaskDataService) { }

  ngOnInit() {
  }

  onCreate() {
    this.taskData.addTask(this.task);
  }
}
