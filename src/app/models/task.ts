import * as shortid from 'shortid';

interface TaskData {
  id?: string;
  title?: string;
  estimation?: number;
  archiveTime?: Date[];
  isComplete?: boolean;
  createdAt?: Date;
}

export class Task {
  id: string;
  title: string;
  estimation: number;
  archiveTime: Date[];
  isComplete: boolean;
  createAt: Date;

  constructor(data: TaskData= {}) {
    this.title = data.title || '';
    this.estimation = data.estimation || 1;
    this.archiveTime = data.archiveTime || [];
    this.isComplete = false;
    this.id = data.id || shortid.generate();
    this.createAt = data.createdAt || new Date();
  }

  get data(): TaskData {
    const {id, title, estimation, archiveTime, isComplete} = this;
    return {id, title, estimation, archiveTime, isComplete};
  }
}

