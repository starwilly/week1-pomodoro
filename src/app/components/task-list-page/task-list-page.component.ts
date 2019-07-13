import { Component, OnInit } from '@angular/core';
import {Task} from '../../models';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-task-list-page',
  templateUrl: './task-list-page.component.html',
  styleUrls: ['./task-list-page.component.scss']
})
export class TaskListPageComponent implements OnInit {

  tasks: Task[] = [];
  editingIndex: number = null;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: {tasks: Task[]}) => this.tasks = data.tasks);
  }

  toggleTaskEdit(index: number) {
    this.editingIndex = index === this.editingIndex ? null : index;
    console.log(index, this.tasks);
  }
}
