import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {BREAK_TIME, TaskState, WORK_TIME} from '../../models';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit, OnChanges {

  constructor() { }

  total: number;
  @Input() elapse: number;
  @Input() type: TaskState;
  color: string;

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.type)  {
      this.color = this.type === TaskState.work ? '#EA5548' : '#B5E254';
      this.total = this.type === TaskState.work ? WORK_TIME : BREAK_TIME;
    }
  }

  get percentage(): number {
    return this.elapse / this.total * 100;
  }

  get text(): string {
    const value = this.total - this.elapse;
    const minute = `${Math.floor(value / 60)}`.padStart(2, '0');
    const second = `${value % 60}`.padStart(2, '0');
    return `${minute}:${second}`;
  }

}
