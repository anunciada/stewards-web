import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelModalComponent } from './excel-modal.component';

describe('ExcelModalComponent', () => {
  let component: ExcelModalComponent;
  let fixture: ComponentFixture<ExcelModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcelModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExcelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
