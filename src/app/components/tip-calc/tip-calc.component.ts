import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TipCalcService } from '../../services/tip-calc/tip-calc.service';
import { TipEmojiPipe } from './tip-emoji.pipe';
import { Component, inject, OnInit, effect, OnDestroy, DestroyRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

interface TipFormValue {
  bill?: number;
  precent?: number;
  currency?: number;
}

@Component({
  selector: 'app-tip-calc',
  standalone: true,
  imports: [ReactiveFormsModule, TipEmojiPipe],
  templateUrl: './tip-calc.component.html',
  styleUrls: ['./tip-calc.component.scss'],
})
export class TipCalcComponent implements OnInit, OnDestroy {
  protected tipService = inject(TipCalcService);
  private readonly data = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  currencies = [
    { name: '₽', value: 2 },
    { name: '$', value: 5 },
    { name: '€', value: 8 },
  ];

  percentages = [
    { name: '5%', value: 0.05 },
    { name: '10%', value: 0.1 },
    { name: '15%', value: 0.15 },
    { name: '20%', value: 0.2 },
  ];

  protected tipForm: FormGroup = this.data.group({
    bill: [this.tipService.bill()],
    precent: [this.tipService.precent()],
    currency: [this.tipService.currency()],
  });

  constructor() {
    effect(() => {
      this.tipForm.patchValue({ bill: this.tipService.bill() }, { emitEvent: false });
    });
  }

  ngOnInit() {
    this.tipForm.valueChanges
      .pipe(debounceTime(100), takeUntilDestroyed(this.destroyRef))
      .subscribe((values: TipFormValue) => {
        console.log('Изменение значения формы:', values);
        this.tipService.precent.set(values.precent ?? 0.1);
        this.tipService.currency.set(values.currency ?? 2);
        if (this.tipForm.valid) {
          this.tipService.calcTip();
        }
      });
  }

  ngOnDestroy() {
    console.log('Компонент удален');
  }
}
