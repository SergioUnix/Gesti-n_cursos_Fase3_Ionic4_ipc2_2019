import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionPreguntaSmPage } from './evaluacion-pregunta-sm.page';

describe('EvaluacionPreguntaSmPage', () => {
  let component: EvaluacionPreguntaSmPage;
  let fixture: ComponentFixture<EvaluacionPreguntaSmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluacionPreguntaSmPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluacionPreguntaSmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
