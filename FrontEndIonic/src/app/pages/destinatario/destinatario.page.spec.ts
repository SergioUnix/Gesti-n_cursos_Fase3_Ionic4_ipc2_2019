import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinatarioPage } from './destinatario.page';

describe('DestinatarioPage', () => {
  let component: DestinatarioPage;
  let fixture: ComponentFixture<DestinatarioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestinatarioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinatarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
