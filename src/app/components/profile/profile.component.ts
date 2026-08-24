import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { TipCalcService } from '../../services/tip-calc/tip-calc.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  protected tipService = inject(TipCalcService);
}
