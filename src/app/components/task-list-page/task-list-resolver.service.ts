import { Injectable } from '@angular/core';
import {TaskDataService} from '../../services/task-data.service';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {take} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Task} from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class TaskListResolverService {

  constructor(
    private taskData: TaskDataService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Task[]> {
    return this.taskData.taskList$.pipe(take(1));
  }
}
