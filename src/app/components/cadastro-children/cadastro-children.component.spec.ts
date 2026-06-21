import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CadastroChildrenComponent } from './cadastro-children.component';

describe('CadastroChildrenComponent', () => {
  let component: CadastroChildrenComponent;
  let fixture: ComponentFixture<CadastroChildrenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CadastroChildrenComponent, IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
