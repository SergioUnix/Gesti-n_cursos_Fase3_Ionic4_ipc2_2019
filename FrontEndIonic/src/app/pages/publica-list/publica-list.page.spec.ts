import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicaListPage } from './publica-list.page';

describe('PublicaListPage', () => {
  let component: PublicaListPage;
  let fixture: ComponentFixture<PublicaListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicaListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicaListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
