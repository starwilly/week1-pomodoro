import {Component, DoCheck, OnInit} from '@angular/core';
import {TaskDataService} from '../../services/task-data.service';
import {addDays, eachDay, format, lastDayOfWeek, startOfWeek} from 'date-fns';
import {Task} from 'src/app/models';

const FORMAT = 'YYYY-MM-DD';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit, DoCheck {

  workHistory: { [key: string]: number };
  taskList: Task[] = [];

  todayCount: number;
  currentWeekCount: number;
  today: Date;
  workCount = 0;
  currentWeek: Date[];
  chartWeek: Date[];
  chartWeekCount: number[][];

  constructor(private taskData: TaskDataService) {
  }


  private updateHistory() {
    const history: { [key: string]: number } = {};
    this.taskList.forEach(task => {
      task.workHistory.forEach((d: Date) => {
        const key = format(d, 'YYYY-MM-DD');
        history[key] = (history[key] || 0) + 1;
      });
    });
    this.workHistory = history;
  }


  ngOnInit() {
    // this.today = new Date('2019-07-18');
    this.today = new Date();
    this.currentWeek = eachDay(
        startOfWeek(this.today),
        lastDayOfWeek(this.today)
    );
    this.chartWeek = [...this.currentWeek];
    this.taskData.taskList$.subscribe(tasks => {
      this.taskList = tasks;
      this.workCount = this.getWorkCount();
      this.updateHistory();
      this.updateReport();
    });
  }

  getWorkCount(): number {
     return this.taskList.reduce((acc, task) => {
      acc += task.workHistory.length;
      return acc;
    }, 0);
  }

  ngDoCheck(): void {
    if (this.workCount !== this.getWorkCount()) {
      this.updateHistory();
      this.updateReport();
    }
  }

  private updateReport() {
    this.todayCount = this.workHistory[format(this.today, FORMAT)] || 0;
    this.currentWeekCount = this.currentWeek
      .reduce((acc, d) => {
        acc += this.workHistory[format(d, FORMAT)] || 0;
        return acc;
      }, 0);
    this.chartWeekCount = this.chartWeek.map(d =>
      Array(this.workHistory[format(d, FORMAT)] || 0).fill(0)
    );
  }

  onNext(): void {
    const chartDay = addDays(this.chartWeek[0], 7);
    this.chartWeek = eachDay(
      startOfWeek(chartDay),
      lastDayOfWeek(chartDay)
    );
    this.updateReport();
  }

  onPrev(): void {
    const chartDay = addDays(this.chartWeek[0], -7);
    this.chartWeek = eachDay(
      startOfWeek(chartDay),
      lastDayOfWeek(chartDay)
    );
    this.updateReport();
  }

  get hasNext(): boolean {
    return this.chartWeek[6].getTime() + 864000 < this.today.getTime();
  }
}
