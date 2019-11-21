import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivadoPage } from './privado.page';

describe('PrivadoPage', () => {
  let component: PrivadoPage;
  let fixture: ComponentFixture<PrivadoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivadoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
