import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TaskListComponent} from './components/task-list/task-list.component';
import {PreferenceComponent} from './components/preference/preference.component';
import {AddTaskComponent} from './components/add-task/add-task.component';


const routes: Routes = [
  { path: 'tasks/add', component: AddTaskComponent, data: {animation: 'in'}},
  { path: 'tasks', component: TaskListComponent},
  { path: 'preference', component: PreferenceComponent, data: {animation: 'in'}},
  { path: '', component: PreferenceComponent, data: {animation: 'out'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
