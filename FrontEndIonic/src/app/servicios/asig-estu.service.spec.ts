import { TestBed } from '@angular/core/testing';

import { AsigEstuService } from './asig-estu.service';

describe('AsigEstuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AsigEstuService = TestBed.get(AsigEstuService);
    expect(service).toBeTruthy();
  });
});
