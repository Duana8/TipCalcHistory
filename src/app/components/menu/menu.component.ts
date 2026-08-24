import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { OrderService } from '../../services/order/order.service';
import { CurrencyPipe } from '@angular/common';
import { TipCalcService } from '../../services/tip-calc/tip-calc.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  protected readonly orderService = inject(OrderService);
  protected readonly tipService = inject(TipCalcService);

  protected addToOrder(item: { image: string; dish: string; price: number }): void {
    this.orderService.addToOrder(item.image, item.dish, item.price);
    this.tipService.upBillAmount(item.price);
  }
}
