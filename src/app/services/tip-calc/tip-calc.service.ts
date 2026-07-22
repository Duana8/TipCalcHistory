import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface TipHistoryItem{
  bill: number,
  tip: number;
}

@Injectable({
  providedIn: 'root',
})

export class TipCalcService {
  public bill: number =0;
  public percent: number= 0.10;
  public tip: number=0;
  public currency:number=0;

  // поток
  public history$ = new BehaviorSubject<TipHistoryItem[]>([]);

   upBillAmount(price: number): void{
    this.bill+=price;
  }

  downBillAmount(price: number): void{
    this.bill-=price;
  }

  calcTip(): void{
     this.tip  =Math.round(this.bill*this.percent*Number(this.currency)); 
     console.log('bill, percent, tip, currency', this.bill, this.percent, this.tip, this.currency);

     console.log('1. Синхронный код: Начало обработчика');

      // данные для отправки в поток
      const historyItem = {
        bill: this.bill,
        tip: this.tip
      };

     // поток
     of(historyItem)
      .pipe(
        delay(3000) 
      )
      .subscribe({
        next: (item) => {
          console.log('3. RxJS Асинхронная задача: Добавляем заказ в историю');
          const currentList = this.history$.getValue();
          this.history$.next([...currentList, item]);
        },
        complete: () => {
          console.log('4. RxJS Поток завершен');
        }
      });

    console.log('2. Синхронный код: Конец обработчика');
  }
}