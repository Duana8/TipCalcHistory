import { Component, inject, OnInit } from "@angular/core";
import { TipCalcService } from "../../services/tip-calc/tip-calc.service";
import { FormsModule } from "@angular/forms";

@Component({
    selector:'app-tip-calc',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './tip-calc.component.html',
    styleUrls: ['./tip-calc.component.scss']
})

export class TipCalcComponent implements OnInit {
    protected tipService = inject(TipCalcService);

    // + api валюты
     currencies= [
        {name: '₽', value: 2},
        {name: '$', value: 5},
        {name: '€', value: 8}
    ]

    ngOnInit() { 
        this.tipService.currency=2;
    } 
}