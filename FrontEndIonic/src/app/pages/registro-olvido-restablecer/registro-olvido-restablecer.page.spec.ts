import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroOlvidoRestablecerPage } from './registro-olvido-restablecer.page';

describe('RegistroOlvidoRestablecerPage', () => {
  let component: RegistroOlvidoRestablecerPage;
  let fixture: ComponentFixture<RegistroOlvidoRestablecerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroOlvidoRestablecerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroOlvidoRestablecerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
