import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCreatePageComponent } from './task-create-page.component';

describe('TaskCreatePageComponent', () => {
  let component: TaskCreatePageComponent;
  let fixture: ComponentFixture<TaskCreatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskCreatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
