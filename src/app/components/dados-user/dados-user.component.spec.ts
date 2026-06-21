import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DadosUserComponent } from './dados-user.component';

describe('DadosUserComponent', () => {
  let component: DadosUserComponent;
  let fixture: ComponentFixture<DadosUserComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DadosUserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DadosUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
