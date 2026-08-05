import { Injectable, signal, computed } from '@angular/core';
import { ReplaySubject, BehaviorSubject } from 'rxjs';

export interface TipHistoryItem {
  bill: number;
  tip: number;
}

export enum CalcStatus {
  Idle = 'калькулятор свободен',
  Calculating = 'вычисляется...',
  Done = 'готово',
}

@Injectable({
  providedIn: 'root',
})
export class TipCalcService {
  public bill = signal<number>(0);
  public precent = signal<number>(0.1);
  public currency = signal<number>(2);
  public tip = computed(() => {
    return Math.round(this.bill() * this.precent() * this.currency());
  });

  protected timer: any = null;

  private readonly historySubject$ = new ReplaySubject<TipHistoryItem>(3);
  public readonly history$ = this.historySubject$.asObservable();

  private readonly statusSubject$ = new BehaviorSubject<CalcStatus>(CalcStatus.Idle);
  public readonly status$ = this.statusSubject$.asObservable();

  upBillAmount(price: number): void {
    this.bill.update((current) => current + price);
    this.calcTip();
    console.log('Новый счет:', this.bill());
  }

  downBillAmount(price: number): void {
    this.bill.update((current) => Math.max(0, current - price));
    this.calcTip();
    console.log('Новый счет:', this.bill());
  }

  calcTip(): void {
    console.log(
      'bill, percent, tip, currency',
      this.bill(),
      this.precent(),
      this.tip(),
      this.currency(),
    );
    this.statusSubject$.next(CalcStatus.Calculating);

    console.log('1. Синхронный код: Начало обработчика');

    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      console.log('3. Асинхронная задача: Добавляем заказ в историю');

      this.timer = null;
      console.log('4. Таймер успешно завершился');
      const newItem: TipHistoryItem = {
        bill: this.bill(),
        tip: this.tip(),
      };

      this.historySubject$.next(newItem);

      this.statusSubject$.next(CalcStatus.Done);
    }, 3000);

    console.log('2. Синхронный код: Конец обработчика');
  }
}
