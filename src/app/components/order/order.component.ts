import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { OrderService } from '../../services/order/order.service';
import { CurrencyPipe } from '@angular/common';
import { TipCalcService } from '../../services/tip-calc/tip-calc.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent {
  protected readonly orderService = inject(OrderService);
  protected readonly tipService = inject(TipCalcService);

  protected removeFromOrder(index: number, price: number): void {
    this.orderService.removeFromOrder(index);
    this.tipService.downBillAmount(price);
  }
}
