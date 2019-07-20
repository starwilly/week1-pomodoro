import { TestBed } from '@angular/core/testing';

import { RingtoneService } from './ringtone.service';

describe('RingtoneService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RingtoneService = TestBed.get(RingtoneService);
    expect(service).toBeTruthy();
  });
});
