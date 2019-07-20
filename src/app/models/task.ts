import * as shortid from 'shortid';

interface TaskData {
  id?: string;
  title?: string;
  estimation?: number;
  workHistory?: Date[];
  isComplete?: boolean;
  createdAt?: Date;
  state?: TaskState;
  workElapse?: number;
  breakElapse?: number;
}

export enum TaskState {
  work,
  break
}

export class Task {
  id: string;
  title: string;
  estimation: number;
  workHistory: Date[];
  isComplete: boolean;
  createAt: Date;
  state: TaskState;
  workElapse: number;
  breakElapse: number;

  constructor(data: TaskData= {}) {
    this.title = data.title || '';
    this.estimation = data.estimation || 1;
    this.workHistory = data.workHistory || [];
    this.isComplete = false;
    this.id = data.id || shortid.generate();
    this.createAt = data.createdAt || new Date();
    this.state = data.state === undefined ? TaskState.work : data.state;
    this.workElapse = data.workElapse === undefined ? 0 : data.workElapse;
    this.breakElapse = data.breakElapse === undefined ? 0 : data.breakElapse;

  }

  get data(): TaskData {
    const {id, title, estimation, workHistory, isComplete, state, workElapse, breakElapse} = this;
    return {id, title, estimation, workHistory, isComplete, state, workElapse, breakElapse};
  }

  finishWork(): void {
    this.workHistory.push(new Date());
    this.resetWorkElapse();
    this.state = TaskState.break;
  }

  finishBreak(): void {
    this.resetBreakElapse();
    this.state = TaskState.work;
  }

  resetWorkElapse(): void {
    this.workElapse = 0;
  }

  resetBreakElapse(): void {
    this.breakElapse = 0;
  }

}

export const WORK_TIME = 3 ;
export const BREAK_TIME = 3;

