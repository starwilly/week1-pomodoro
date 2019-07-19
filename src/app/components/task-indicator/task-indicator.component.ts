import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {WORK_TIME} from '../../models';

@Component({
  selector: 'app-task-indicator',
  templateUrl: './task-indicator.component.html',
  styleUrls: ['./task-indicator.component.scss']
})
export class TaskIndicatorComponent implements OnInit, OnChanges {

  @Input() estimation: number;
  @Input() finished: number;
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
