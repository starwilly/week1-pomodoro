import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Task, WORK_TIME} from '../../models';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnChanges {

  @Input() title: string;
  @Input() estimation: number;
  @Input() finished: number;
  @Input() showWorking = false;
  @Input() workElapse: number;
  indicators: number[];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.estimation || changes.finished || changes.workElapse) {
      let size = Math.max(this.estimation, this.finished)  || 0;
      if (this.finished >= this.estimation && this.workElapse > 0) {
        size += 1;
      }
      this.indicators = Array(size).fill(0).map((x, i) => i);
    }
  }

  percentage(index): number {
    if (index === this.finished) {
      return this.workElapse / WORK_TIME * 100;
    }
    return index < this.finished ? 101 : 0;
  }
}
