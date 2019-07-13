import { Component, OnInit } from '@angular/core';
import {Task} from '../../models';
import {ActivatedRoute} from '@angular/router';
import {TaskDataService} from '../../services/task-data.service';

@Component({
  selector: 'app-task-list-page',
  templateUrl: './task-list-page.component.html',
  styleUrls: ['./task-list-page.component.scss']
})
export class TaskListPageComponent implements OnInit {

  tasks: Task[] = [];
  editingTask: Task = null;
  constructor(private route: ActivatedRoute, private taskData: TaskDataService) { }

  ngOnInit() {
    this.route.data.subscribe((data: {tasks: Task[]}) => this.tasks = data.tasks);
    this.taskData.taskList$.subscribe(tasks => this.tasks = tasks);
  }

  toggleTaskEdit(task: Task) {
    this.editingTask = this.editingTask === task ? null : task;
  }

  updateTask(task: Task) {
    this.taskData.updateTask(task);
  }
}
