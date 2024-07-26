import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPersonalComponent } from './chat-personal.component';

describe('ChatPersonalComponent', () => {
  let component: ChatPersonalComponent;
  let fixture: ComponentFixture<ChatPersonalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatPersonalComponent]
    });
    fixture = TestBed.createComponent(ChatPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
