import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { ClockComponent } from './components/clock/clock.component';
import { PreferenceComponent } from './components/preference/preference.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TaskListPageComponent } from './components/task-list-page/task-list-page.component';
import {TaskDataService} from './services/task-data.service';
import { TaskCreatePageComponent } from './components/task-create-page/task-create-page.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    ClockComponent,
    PreferenceComponent,
    NavigationComponent,
    AddTaskComponent,
    TaskListPageComponent,
    TaskCreatePageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [TaskDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
