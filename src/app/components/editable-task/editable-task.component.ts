import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from '../../models';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-editable-task',
  templateUrl: './editable-task.component.html',
  styleUrls: ['./editable-task.component.scss']
})
export class EditableTaskComponent implements OnInit {

  @Input() task: Task;
  @Input() isOpen: boolean;

  @Output() toggleBtnClick = new EventEmitter<void >();
  @Output() taskEdit = new EventEmitter<Task>();
  @Output() taskSelect = new EventEmitter<Task>();

  editingTask: Task = null;

  constructor() { }

  ngOnInit() {
  }

  onToggleBtnClick() {
    this.editingTask = new Task(this.task.data);
    this.toggleBtnClick.emit();
  }

  editTask(form: NgForm) {
    const task = new Task({...this.task.data, ...form.value});
    this.taskEdit.emit(task);
    console.log(task);
    this.editingTask = null;
  }

}
