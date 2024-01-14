import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteLinkMailComponent } from './invite-link-mail.component';

describe('InviteLinkMailComponent', () => {
  let component: InviteLinkMailComponent;
  let fixture: ComponentFixture<InviteLinkMailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InviteLinkMailComponent]
    });
    fixture = TestBed.createComponent(InviteLinkMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
