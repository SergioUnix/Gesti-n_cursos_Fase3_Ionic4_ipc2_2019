import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuxiliarDesasignarMotivoPage } from './auxiliar-desasignar-motivo.page';

describe('AuxiliarDesasignarMotivoPage', () => {
  let component: AuxiliarDesasignarMotivoPage;
  let fixture: ComponentFixture<AuxiliarDesasignarMotivoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuxiliarDesasignarMotivoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuxiliarDesasignarMotivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
