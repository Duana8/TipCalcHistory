import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TipEmojiPipe } from './tip-emoji.pipe';
import {
  Component,
  inject,
  OnInit,
  effect,
  OnDestroy,
  DestroyRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { TipCalcService } from '../../services/tip-calc/tip-calc.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CurrencySymbol, CURRENCIES } from '../../models/currency.model';

interface TipFormValue {
  bill?: number;
  precent?: number;
  currency?: CurrencySymbol;
}

@Component({
  selector: 'app-tip-calc',
  standalone: true,
  imports: [ReactiveFormsModule, TipEmojiPipe],
  templateUrl: './tip-calc.component.html',
  styleUrls: ['./tip-calc.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TipCalcComponent implements OnInit, OnDestroy {
  protected tipService = inject(TipCalcService);
  private readonly data = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  protected calcStatus = toSignal(this.tipService.status$);
  protected readonly currencies = CURRENCIES;

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
        this.tipService.currency.set(values.currency ?? CURRENCIES[0]);
        if (this.tipForm.valid) {
          this.tipService.calcTip();
        }
      });
  }

  ngOnDestroy() {
    console.log('Компонент удален');
  }
}
