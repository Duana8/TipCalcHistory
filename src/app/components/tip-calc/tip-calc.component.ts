import { Component, inject, OnInit, effect } from "@angular/core";
import { TipCalcService } from "../../services/tip-calc/tip-calc.service";
import { FormBuilder, FormGroup, 
    ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
    selector:'app-tip-calc',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './tip-calc.component.html',
    styleUrls: ['./tip-calc.component.scss']
})

export class TipCalcComponent implements OnInit {
    protected tipService = inject(TipCalcService);
    private readonly data = inject(FormBuilder);

    // + api валюты
     currencies= [
        {name: '₽', value: 2},
        {name: '$', value: 5},
        {name: '€', value: 8}
    ]

    protected tipForm: FormGroup = this.data.group({
        bill: [this.tipService.bill, [Validators.required, Validators.min(10)]],
        precent: [this.tipService.percent], 
        currency: [this.tipService.currency]
    });

    constructor() {
    // Следим за изменениями bill в сервисе
        effect(() => {
            this.tipForm.patchValue({ bill: this.tipService.bill }, { emitEvent: false });
            
            if (this.tipForm.valid) {
                this.tipService.calcTip();
            }
        });
    }

    ngOnInit() {
        // Авторасчет при изменениях в форме
        this.tipForm.valueChanges.subscribe(values => {
            this.tipService.percent = Number(values.precent) || 10;
            this.tipService.currency = Number(values.currency) || 2;

            if (this.tipForm.valid) {
                this.tipService.calcTip();
            }
        });
    }
}