import { TestBed } from '@angular/core/testing';

import { TaskListResolverService } from './task-list-resolver.service';

describe('TaskListResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskListResolverService = TestBed.get(TaskListResolverService);
    expect(service).toBeTruthy();
  });
});
