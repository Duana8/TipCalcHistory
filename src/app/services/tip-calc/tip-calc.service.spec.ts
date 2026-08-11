import { TestBed } from '@angular/core/testing';

import { TipCalcService } from './tip-calc.service';

import { vi } from 'vitest'; // утилиты для работы со временем

describe('TipCalcService', () => {
  let service: TipCalcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipCalcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('добавление записи в историю', () => {
    vi.useFakeTimers();

    service.bill = 200;
    service.percent = 0.1;
    service.currency = 1;

    service.calcTip();

    expect(service.history()).toHaveLength(0);

    vi.advanceTimersByTime(3000);

    expect(service.history()).toHaveLength(1);

    expect(service.history()[0]).toEqual({
      bill: 200,
      tip: 20,
    });

    vi.useRealTimers();
  });
});
