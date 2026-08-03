import { Injectable, signal, computed } from '@angular/core';

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
    return Math.round(this.bill() * this.precent() * Number(this.currency()));
  });
  public history = signal<TipHistoryItem[]>([]);

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

  private timer: any;

  calcTip(): void {
    //const currentTip = this.tip();

    console.log(
      'bill, percent, tip, currency',
      this.bill(),
      this.precent(),
      this.tip(),
      this.currency(),
    );

    console.log('1. Синхронный код: Начало обработчика');

    clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      console.log('4. Макрозадача (setTimeout): Добавляем заказ в историю на странице');

      this.history.update((list) => [
        ...list,
        {
          bill: this.bill(),
          tip: this.tip(),
        },
      ]);
    }, 3000);

    Promise.resolve('Данные подготовлены для истории!').then((message) => {
      console.log('3. Микрозадача (Promise.then): ' + message);
    });

    console.log('2. Синхронный код: Конец обработчика');
  }
}
