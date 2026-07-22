import { Component, inject } from "@angular/core";
import { TipCalcService } from "../../services/tip-calc/tip-calc.service";
import { FormsModule } from "@angular/forms";
import { AsyncPipe } from "@angular/common";

@Component({
    selector:'app-tip-calc',
    standalone: true,
    imports: [FormsModule, AsyncPipe],
    templateUrl: './tip-calc.component.html',
    styleUrls: ['./tip-calc.component.scss']
})

export class TipCalcComponent {
    protected tipService = inject(TipCalcService);

    // + api валюты
     currencies= [
        {name: '₽', value: 2},
        {name: '$', value: 5},
        {name: '€', value: 8}
    ]
    currency:string=this.currencies[0].name;

    ngOnInit() { // не работает
        if (this.tipService.currency) 
            this.currencies[0].name; 
    } 
}