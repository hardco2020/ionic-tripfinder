import { TestBed } from '@angular/core/testing';

import { SelectFormService } from './select-form.service';

describe('SelectFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectFormService = TestBed.get(SelectFormService);
    expect(service).toBeTruthy();
  });
});
