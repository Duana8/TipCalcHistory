import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrderService } from "../../services/order/order.service";
import { CurrencyPipe } from "@angular/common";
import { TipCalcService } from "../../services/tip-calc/tip-calc.service";

@Component({
    selector:'app-menu',
    standalone: true, /**/
    imports: [CurrencyPipe],
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})

export class MenuComponent {
    protected readonly orderService = inject(OrderService);
    protected readonly tipService = inject(TipCalcService);
}