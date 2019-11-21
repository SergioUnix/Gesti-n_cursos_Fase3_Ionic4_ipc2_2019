import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionPreguntaOrdePage } from './evaluacion-pregunta-orde.page';

describe('EvaluacionPreguntaOrdePage', () => {
  let component: EvaluacionPreguntaOrdePage;
  let fixture: ComponentFixture<EvaluacionPreguntaOrdePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluacionPreguntaOrdePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluacionPreguntaOrdePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
