import { describe, it, expect } from 'vitest';
import { formatPrice, formatTimeAgo, truncateTitle, parsePrice, calculateOriginalPrice, calculateSavings } from '../../src/lib/format';

describe('parsePrice', () => {
  it('parses dollar amount', () => expect(parsePrice('$19.99')).toBe(19.99));
  it('returns null for null', () => expect(parsePrice(null)).toBeNull());
  it('returns null for empty', () => expect(parsePrice('')).toBeNull());
  it('parses without dollar sign', () => expect(parsePrice('42.50')).toBe(42.5));
});

describe('formatPrice', () => {
  it('returns price as-is if starts with $', () => expect(formatPrice('$19.99')).toBe('$19.99'));
  it('adds $ prefix', () => expect(formatPrice('19.99')).toBe('$19.99'));
  it('handles null', () => expect(formatPrice(null)).toBe('See Price on Amazon'));
});

describe('formatTimeAgo', () => {
  it('returns just now for recent', () => {
    expect(formatTimeAgo(new Date().toISOString())).toBe('just now');
  });
  it('returns minutes', () => {
    const d = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    expect(formatTimeAgo(d)).toBe('5m ago');
  });
  it('returns hours', () => {
    const d = new Date(Date.now() - 3 * 3600 * 1000).toISOString();
    expect(formatTimeAgo(d)).toBe('3h ago');
  });
  it('returns days', () => {
    const d = new Date(Date.now() - 2 * 86400 * 1000).toISOString();
    expect(formatTimeAgo(d)).toBe('2d ago');
  });
  it('returns weeks', () => {
    const d = new Date(Date.now() - 14 * 86400 * 1000).toISOString();
    expect(formatTimeAgo(d)).toBe('2w ago');
  });
  it('handles future date', () => {
    const d = new Date(Date.now() + 60000).toISOString();
    expect(formatTimeAgo(d)).toBe('just now');
  });
});

describe('truncateTitle', () => {
  it('leaves short titles alone', () => expect(truncateTitle('Short')).toBe('Short'));
  it('truncates long titles', () => {
    const long = 'A'.repeat(100);
    const result = truncateTitle(long, 80);
    expect(result.length).toBeLessThanOrEqual(81);
    expect(result.endsWith('…')).toBe(true);
  });
});

describe('calculateOriginalPrice', () => {
  it('calculates original', () => expect(calculateOriginalPrice('$20.00', 50)).toBe('$40.00'));
  it('returns null for no discount', () => expect(calculateOriginalPrice('$20.00', 0)).toBeNull());
  it('returns null for null price', () => expect(calculateOriginalPrice(null, 50)).toBeNull());
});
