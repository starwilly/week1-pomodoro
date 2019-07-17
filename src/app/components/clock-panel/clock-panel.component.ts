import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskDataService} from '../../services/task-data.service';
import {Observable, Subject, timer} from 'rxjs';
import {BREAK_TIME, Task, TaskState, WORK_TIME} from '../../models';
import {filter, map, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-clock-panel',
  templateUrl: './clock-panel.component.html',
  styleUrls: ['./clock-panel.component.scss']
})
export class ClockPanelComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  currentTask: Task;
  WORK_TIME = WORK_TIME;
  BREAK_TIME = BREAK_TIME;
  TaskState = TaskState;
  ticking = false;

  constructor(taskData: TaskDataService) {
    taskData.selectedTask$.pipe(takeUntil(this.destroy$))
      .subscribe(task => this.currentTask = task);
  }

  ngOnInit() {
    const tick$ = timer(0, 1000)
      .pipe(filter(() => this.ticking && !!this.currentTask));

    const workTick$ = tick$.pipe(
      filter(() => this.currentTask.state === TaskState.work && this.currentTask.workElapse <= WORK_TIME),
      map(() => this.currentTask.workElapse)
    );

    const breakTick$ = tick$.pipe(
      filter(() => this.currentTask.state === TaskState.break && this.currentTask.breakElapse <= BREAK_TIME),
      map(() => this.currentTask.breakElapse)
    );

    workTick$.subscribe((elapse) => {
      if (elapse < WORK_TIME) {
        this.currentTask.workElapse += 1;
      } else {
        // work complete
        this.ticking = false;
        this.currentTask.finishWork();
      }
    });

    breakTick$.subscribe((elapse) => {
      if (elapse < BREAK_TIME) {
        this.currentTask.breakElapse += 1;
      } else {
        this.ticking = false;
        this.currentTask.finishBreak();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  play() {
    this.ticking = true;
  }

  pause() {
    this.ticking = false;
  }

  skip() {
    if (!this.currentTask) {
      return;
    }
    if (this.currentTask.state === TaskState.work) {
      this.currentTask.resetWorkElapse();
    } else {
      this.currentTask.resetBreakElapse();
      this.currentTask.state = TaskState.work;
    }
    this.ticking = false;
  }
}
