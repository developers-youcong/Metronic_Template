import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorProfitComponent } from './author-profit.component';

describe('AuthorProfitComponent', () => {
  let component: AuthorProfitComponent;
  let fixture: ComponentFixture<AuthorProfitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorProfitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorProfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
