import { describe, it, expect } from 'vitest';
import { TipEmojiPipe } from './tip-emoji.pipe';

describe('TipEmojiPipe', () => {
  const pipe = new TipEmojiPipe();

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });

  it('должен иметь гибкий диапазон процентов', () => {
    const result = pipe.transform(0.11);
    expect(result).toBe('🙂');
  });
});
