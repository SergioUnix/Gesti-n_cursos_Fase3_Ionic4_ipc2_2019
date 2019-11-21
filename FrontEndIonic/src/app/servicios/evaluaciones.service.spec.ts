import { TestBed } from '@angular/core/testing';

import { EvaluacionesService } from './evaluaciones.service';

describe('EvaluacionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EvaluacionesService = TestBed.get(EvaluacionesService);
    expect(service).toBeTruthy();
  });
});
