import { TestBed } from '@angular/core/testing';

import { FacturService } from './factur.service';

describe('FacturService', () => {
  let service: FacturService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacturService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
