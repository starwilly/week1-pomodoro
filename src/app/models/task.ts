// export interface Task {
//   title: string;
//   estimation: number;
//   achieveTimes: Date[];
//   isComplete: boolean;
// }

export class Task {
  title: string;
  estimation: number;
  archiveTime: Date[];
  isComplete: boolean;

  constructor(data: {
                title?: string;
                estimation?: number;
                archiveTime?: Date[];
                isComplete?: boolean;
              } = {}) {
    this.title = data.title || '';
    this.estimation = data.estimation || 1;
    this.archiveTime = data.archiveTime || [];
    this.isComplete = false;
  }
}

