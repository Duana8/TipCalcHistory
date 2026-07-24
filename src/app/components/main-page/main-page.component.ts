import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { OrderComponent } from '../order/order.component';
import { TipCalcComponent } from '../tip-calc/tip-calc.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [MenuComponent, OrderComponent, TipCalcComponent],
  templateUrl: './main-page.component.html',
  styleUrls: []
})
export class MainPageComponent { }