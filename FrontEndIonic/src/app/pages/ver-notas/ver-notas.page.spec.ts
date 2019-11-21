import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerNotasPage } from './ver-notas.page';

describe('VerNotasPage', () => {
  let component: VerNotasPage;
  let fixture: ComponentFixture<VerNotasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerNotasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerNotasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
