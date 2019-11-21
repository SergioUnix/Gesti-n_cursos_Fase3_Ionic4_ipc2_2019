import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioEditPage } from './horario-edit.page';

describe('HorarioEditPage', () => {
  let component: HorarioEditPage;
  let fixture: ComponentFixture<HorarioEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorarioEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorarioEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
