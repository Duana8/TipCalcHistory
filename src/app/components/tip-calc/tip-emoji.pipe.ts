import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipEmoji',
  standalone: true
})
export class TipEmojiPipe implements PipeTransform {


  transform(percent: number): string {
    const pct = Number(percent) * 100; 
    if (pct === 0) return '❌';
    if (pct === 5 || pct === 10) return '😐';
    if (pct === 15) return '🙂';

    return '🚀 Вау, супер-щедро!';
  }
}