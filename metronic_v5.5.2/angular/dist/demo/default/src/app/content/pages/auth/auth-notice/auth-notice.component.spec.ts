import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthNoticeComponent } from './auth-notice.component';

describe('AuthNoticeComponent', () => {
  let component: AuthNoticeComponent;
  let fixture: ComponentFixture<AuthNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
