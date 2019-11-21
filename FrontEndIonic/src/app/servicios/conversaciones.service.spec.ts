import { TestBed } from '@angular/core/testing';

import { ConversacionesService } from './conversaciones.service';

describe('ConversacionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConversacionesService = TestBed.get(ConversacionesService);
    expect(service).toBeTruthy();
  });
});
