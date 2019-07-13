import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Task} from '../../models';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnChanges {

  @Input() task: Task;
  estimations: number[];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.task) {
      const {estimation} = this.task;
      this.estimations = Array(estimation).fill(0).map((x, i) => i);
    }
  }


}
