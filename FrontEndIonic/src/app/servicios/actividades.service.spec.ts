import { TestBed } from '@angular/core/testing';

import { ActividadesService } from './actividades.service';

describe('ActidadesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActividadesService = TestBed.get(ActividadesService);
    expect(service).toBeTruthy();
  });
});
