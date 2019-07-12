import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TaskListComponent} from './components/task-list/task-list.component';
import {PreferenceComponent} from './components/preference/preference.component';


const routes: Routes = [
  { path: 'tasks', component: TaskListComponent},
  { path: 'preference', component: PreferenceComponent},
  { path: '', component: PreferenceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
