import { describe, it, expect } from 'vitest';
import { RATING_CONFIG, CATEGORIES, FILTER_CATEGORIES, CATEGORY_EMOJI } from '../../src/lib/constants';

describe('RATING_CONFIG', () => {
  it('has all ratings', () => {
    expect(RATING_CONFIG).toHaveProperty('FIRE');
    expect(RATING_CONFIG).toHaveProperty('HOT');
    expect(RATING_CONFIG).toHaveProperty('WARM');
    expect(RATING_CONFIG).toHaveProperty('GOOD');
    expect(RATING_CONFIG).toHaveProperty('WORTH A LOOK');
  });

  it('each rating has color, label, emoji', () => {
    Object.values(RATING_CONFIG).forEach((r) => {
      expect(r.color).toBeTruthy();
      expect(r.label).toBeTruthy();
      expect(r.emoji).toBeTruthy();
    });
  });
});

describe('CATEGORIES', () => {
  it('is a non-empty array', () => {
    expect(CATEGORIES.length).toBeGreaterThan(0);
  });
});

describe('CATEGORY_EMOJI', () => {
  it('has entries', () => {
    expect(Object.keys(CATEGORY_EMOJI).length).toBeGreaterThan(0);
  });
});

describe('FILTER_CATEGORIES', () => {
  it('starts with All', () => {
    expect(FILTER_CATEGORIES[0].key).toBe('all');
  });
});
