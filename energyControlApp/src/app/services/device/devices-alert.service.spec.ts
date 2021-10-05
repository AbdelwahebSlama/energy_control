import { TestBed } from '@angular/core/testing';

import { DevicesAlertService } from './devices-alert.service';

describe('DevicesAlertService', () => {
  let service: DevicesAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevicesAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
