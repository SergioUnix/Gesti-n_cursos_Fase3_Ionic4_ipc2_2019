import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadRealizarPage } from './actividad-realizar.page';

describe('ActividadRealizarPage', () => {
  let component: ActividadRealizarPage;
  let fixture: ComponentFixture<ActividadRealizarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActividadRealizarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadRealizarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
