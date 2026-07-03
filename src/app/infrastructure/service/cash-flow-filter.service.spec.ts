import { TestBed } from '@angular/core/testing';

import { CashFlowFilterService } from './cash-flow-filter.service';

describe('CashFlowFilterService', () => {
  let service: CashFlowFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashFlowFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
