import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionFormPage } from './seccion-form.page';

describe('SeccionFormPage', () => {
  let component: SeccionFormPage;
  let fixture: ComponentFixture<SeccionFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeccionFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeccionFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
