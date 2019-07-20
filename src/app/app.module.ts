import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClockComponent } from './components/clock/clock.component';
import { PreferenceComponent } from './components/preference/preference.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TaskListPageComponent } from './components/task-list-page/task-list-page.component';
import {TaskDataService} from './services/task-data.service';
import { TaskCreatePageComponent } from './components/task-create-page/task-create-page.component';
import {FormsModule} from '@angular/forms';
import { TaskComponent } from './components/task/task.component';
import { EditableTaskComponent } from './components/editable-task/editable-task.component';
import { DonutComponent } from './components/donut/donut.component';
import { ClockPanelComponent } from './components/clock-panel/clock-panel.component';
import { TaskIndicatorComponent } from './components/task-indicator/task-indicator.component';
import {MatTabsModule} from '@angular/material';
import { ReportComponent } from './components/report/report.component';

@NgModule({
  declarations: [
    AppComponent,
    ClockComponent,
    PreferenceComponent,
    NavigationComponent,
    AddTaskComponent,
    TaskListPageComponent,
    TaskCreatePageComponent,
    TaskComponent,
    EditableTaskComponent,
    DonutComponent,
    ClockPanelComponent,
    TaskIndicatorComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatTabsModule
  ],
  providers: [TaskDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
