import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesCrearNotaPage } from './actividades-crear-nota.page';

describe('ActividadesCrearNotaPage', () => {
  let component: ActividadesCrearNotaPage;
  let fixture: ComponentFixture<ActividadesCrearNotaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActividadesCrearNotaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadesCrearNotaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
