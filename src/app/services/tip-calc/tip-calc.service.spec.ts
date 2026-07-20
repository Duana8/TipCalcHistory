import { TestBed } from '@angular/core/testing';

import { TipCalcService } from './tip-calc.service';

describe('TipCalcService', () => {
  let service: TipCalcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipCalcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
