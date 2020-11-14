import { TestBed } from '@angular/core/testing';

import { Service.ServiceService } from './service.service.service';

describe('Service.ServiceService', () => {
  let service: Service.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Service.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
