import {Component, OnDestroy, OnInit} from '@angular/core';
import {Task} from '../../models';
import {ActivatedRoute} from '@angular/router';
import {TaskDataService} from '../../services/task-data.service';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-task-list-page',
  templateUrl: './task-list-page.component.html',
  styleUrls: ['./task-list-page.component.scss']
})
export class TaskListPageComponent implements OnInit, OnDestroy {

  tasks: Task[] = [];
  editingTask: Task = null;
  currentTask: Task = null;
  destroy$: Subject<void> = new Subject();

  constructor(private route: ActivatedRoute, private taskData: TaskDataService) { }

  ngOnInit() {
    this.route.data.subscribe((data: {tasks: Task[]}) => this.tasks = data.tasks);
    this.taskData.taskList$.pipe(takeUntil(this.destroy$)).subscribe(tasks => this.tasks = tasks);
    this.taskData.selectedTask$.pipe(takeUntil(this.destroy$)).subscribe(task => this.currentTask = task);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleTaskEdit(task: Task) {
    this.editingTask = this.editingTask === task ? null : task;
  }

  updateTask(task: Task) {
    this.taskData.updateTask(task);
  }

  onTaskSelect(task: Task) {
    this.taskData.selectTask(task);
  }

}
