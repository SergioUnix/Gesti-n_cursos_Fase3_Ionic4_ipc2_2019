import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioFormPage } from './horario-form.page';

describe('HorarioFormPage', () => {
  let component: HorarioFormPage;
  let fixture: ComponentFixture<HorarioFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorarioFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorarioFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
