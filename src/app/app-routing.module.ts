import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PreferenceComponent} from './components/preference/preference.component';
import {AddTaskComponent} from './components/add-task/add-task.component';
import {TaskListPageComponent} from './components/task-list-page/task-list-page.component';
import {TaskListResolverService} from './components/task-list-page/task-list-resolver.service';


const routes: Routes = [
  { path: 'tasks/add', component: AddTaskComponent, data: {animation: 'in'}},
  { path: 'tasks', component: TaskListPageComponent,
    data: {animation: 'in'},
    resolve: {tasks: TaskListResolverService}},
  { path: 'preference', component: PreferenceComponent, data: {animation: 'in'}},
  { path: '', component: PreferenceComponent, data: {animation: 'out'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [TaskListResolverService],
  exports: [RouterModule]
})
export class AppRoutingModule { }
