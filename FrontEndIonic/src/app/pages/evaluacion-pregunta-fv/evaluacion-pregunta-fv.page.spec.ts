import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionPreguntaFvPage } from './evaluacion-pregunta-fv.page';

describe('EvaluacionPreguntaFvPage', () => {
  let component: EvaluacionPreguntaFvPage;
  let fixture: ComponentFixture<EvaluacionPreguntaFvPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluacionPreguntaFvPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluacionPreguntaFvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
