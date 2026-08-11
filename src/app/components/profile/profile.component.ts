import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { scan } from 'rxjs';
import { TipCalcService, TipHistoryItem } from '../../services/tip-calc/tip-calc.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  protected tipService = inject(TipCalcService);

  // накапливаем прилетающие элементы из потока в массив и оборачиваем в сигнал
  protected historyList = toSignal(
    this.tipService.history$.pipe(scan((acc, item) => [item, ...acc], [] as TipHistoryItem[])),
    { initialValue: [] },
  );
}
