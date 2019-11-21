import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoEditPage } from './curso-edit.page';

describe('CursoEditPage', () => {
  let component: CursoEditPage;
  let fixture: ComponentFixture<CursoEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursoEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
