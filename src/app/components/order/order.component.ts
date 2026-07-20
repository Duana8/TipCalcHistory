import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrderService } from "../../services/order/order.service";
import { CurrencyPipe } from "@angular/common";
import { TipCalcService } from "../../services/tip-calc/tip-calc.service";

@Component({
    selector:'app-order',
    standalone: true,
    imports: [CurrencyPipe],
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})

export class OrderComponent {
    protected readonly orderService = inject(OrderService);
    protected readonly tipService = inject(TipCalcService);
}