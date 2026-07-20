import { Injectable, signal } from '@angular/core';

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
  public history = signal<TipHistoryItem[]>([]);

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

    setTimeout(() => {
        console.log('4. Макрозадача (setTimeout): Добавляем заказ в историю на странице');

this.history.update(list=>[...list,
  {
bill: this.bill,
tip: this.tip
  }
])
;}, 3000);
       //  currency: this.currency

    Promise.resolve('Данные подготовлены для истории!')
        .then((message) => {
            console.log('3. Микрозадача (Promise.then): ' + message);
        });
                console.log('2. Синхронный код: Конец обработчика');
  }
}