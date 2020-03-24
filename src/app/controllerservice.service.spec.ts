import { TestBed } from '@angular/core/testing';

import { ControllerserviceService } from './controllerservice.service';

describe('ControllerserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ControllerserviceService = TestBed.get(ControllerserviceService);
    expect(service).toBeTruthy();
  });
});
