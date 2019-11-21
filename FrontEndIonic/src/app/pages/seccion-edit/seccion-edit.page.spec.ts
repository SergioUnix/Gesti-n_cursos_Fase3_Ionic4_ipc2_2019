import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionEditPage } from './seccion-edit.page';

describe('SeccionEditPage', () => {
  let component: SeccionEditPage;
  let fixture: ComponentFixture<SeccionEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeccionEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeccionEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
