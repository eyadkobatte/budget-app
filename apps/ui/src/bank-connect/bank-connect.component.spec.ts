import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BankConnectComponent } from './bank-connect.component';

describe('BankConnectComponent', () => {
  let component: BankConnectComponent;
  let fixture: ComponentFixture<BankConnectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankConnectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BankConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
