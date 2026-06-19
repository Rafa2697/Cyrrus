import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeUsersPage } from './home-users.page';

describe('HomeUsersPage', () => {
  let component: HomeUsersPage;
  let fixture: ComponentFixture<HomeUsersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
