import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Task} from '../../models';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnChanges {

  @Input() title: string;
  @Input() estimation: number;
  @Input() finished: number;
  estimations: number[];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.estimation) {
      this.estimations = Array(this.estimation).fill(0).map((x, i) => i);
    }
  }


}
