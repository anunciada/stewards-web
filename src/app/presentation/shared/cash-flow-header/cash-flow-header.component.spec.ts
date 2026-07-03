import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashFlowHeaderComponent } from './cash-flow-header.component';

describe('CashFlowHeaderComponent', () => {
  let component: CashFlowHeaderComponent;
  let fixture: ComponentFixture<CashFlowHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashFlowHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CashFlowHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
