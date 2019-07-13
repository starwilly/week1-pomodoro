import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from '../../models';

@Component({
  selector: 'app-editable-task',
  templateUrl: './editable-task.component.html',
  styleUrls: ['./editable-task.component.scss']
})
export class EditableTaskComponent implements OnInit {

  @Input() task: Task;
  @Input() isOpen: boolean;

  @Output() toggleBtnClick = new EventEmitter<void >();

  constructor() { }

  ngOnInit() {
  }

}
