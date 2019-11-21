import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuxiliarDesasignarPage } from './auxiliar-desasignar.page';

describe('AuxiliarDesasignarPage', () => {
  let component: AuxiliarDesasignarPage;
  let fixture: ComponentFixture<AuxiliarDesasignarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuxiliarDesasignarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuxiliarDesasignarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
