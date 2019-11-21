import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarPage } from './asignar.page';

describe('AsignarPage', () => {
  let component: AsignarPage;
  let fixture: ComponentFixture<AsignarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
