import { describe, it, expect } from 'vitest';
import { TipEmojiPipe } from './tip-emoji.pipe';

describe('TipEmojiPipe', () => {
  const pipe = new TipEmojiPipe();

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });

  it('эмоджи должен поднастраиваться под процент', () => {
    const result = pipe.transform(0.15);
    expect(result).toBe('🙂');
  });
});
