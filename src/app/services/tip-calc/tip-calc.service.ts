import { Injectable, signal, computed } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface TipHistoryItem {
  bill: number;
  tip: number;
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

  public history$ = new BehaviorSubject<TipHistoryItem[]>([]);

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

    console.log('1. Синхронный код: Начало обработчика');

    const historyItem = {
      bill: this.bill(),
      tip: this.tip(),
    };

    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      console.log('3. Асинхронная задача: Добавляем заказ в историю');
      const currentList = this.history$.getValue();
      this.history$.next([...currentList, historyItem]);

      this.timer = null;
      console.log('4. Таймер успешно завершился');
    }, 3000);

    console.log('2. Синхронный код: Конец обработчика');
  }
}
