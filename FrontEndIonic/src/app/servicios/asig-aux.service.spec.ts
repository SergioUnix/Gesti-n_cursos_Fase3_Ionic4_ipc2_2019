import { TestBed } from '@angular/core/testing';

import { AsigAuxService } from './asig-aux.service';

describe('AsigAuxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AsigAuxService = TestBed.get(AsigAuxService);
    expect(service).toBeTruthy();
  });
});
