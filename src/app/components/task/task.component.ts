import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Task, WORK_TIME} from '../../models';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() title: string;
  @Input() estimation: number;
  @Input() finished: number;
  @Input() workElapse: number;

  constructor() { }

  ngOnInit() {
  }
}
