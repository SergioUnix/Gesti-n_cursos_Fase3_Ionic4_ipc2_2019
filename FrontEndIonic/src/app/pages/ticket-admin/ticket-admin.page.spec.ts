import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketAdminPage } from './ticket-admin.page';

describe('TicketAdminPage', () => {
  let component: TicketAdminPage;
  let fixture: ComponentFixture<TicketAdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketAdminPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
