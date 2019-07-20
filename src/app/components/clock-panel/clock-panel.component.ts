import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TaskDataService} from '../../services/task-data.service';
import {Observable, Subject, timer} from 'rxjs';
import {BREAK_TIME, Task, TaskState, WORK_TIME} from '../../models';
import {filter, map, take, takeUntil} from 'rxjs/operators';
import {RingtoneService} from '../../services/ringtone.service';

@Component({
  selector: 'app-clock-panel',
  templateUrl: './clock-panel.component.html',
  styleUrls: ['./clock-panel.component.scss']
})
export class ClockPanelComponent implements OnInit, OnDestroy, AfterViewInit {

  private destroy$ = new Subject<void>();
  currentTask: Task;
  TaskState = TaskState;
  ticking = false;
  ringtoneFile = '';

  @ViewChild('clockAudio', {static: false}) clockAudioRef: ElementRef;

  constructor(taskData: TaskDataService, private ringtoneService: RingtoneService) {
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
        this.playWorkRingtone('work');
        console.log('work ringtone played');
      }
    });


    breakTick$.subscribe((elapse) => {
      if (elapse < BREAK_TIME) {
        this.currentTask.breakElapse += 1;
      } else {
        this.ticking = false;
        this.currentTask.finishBreak();
        this.playWorkRingtone('break');
        console.log('break ringtone played');
      }
    });
  }

  private playWorkRingtone(type: 'work' | 'break'): void {
    const elem = this.clockAudioRef.nativeElement as HTMLAudioElement;
    const ob = type === 'work' ? this.ringtoneService.workRingtone$ : this.ringtoneService.breakRingtone$;
    ob.pipe(take(1)).subscribe(f => {
      this.ringtoneFile = `assets/ringtones/${f}`;
      elem.load();
      elem.play();
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

  ngAfterViewInit(): void {
    // console.log(this.clockAudioRef);
    // this.clockAudioRef.nativeElement.play();
  }
}
