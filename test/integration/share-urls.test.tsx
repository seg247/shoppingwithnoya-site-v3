import { describe, it, expect } from 'vitest';
import { SHARE_TARGETS, generateShareUrl } from '../../src/lib/share';
import type { Deal } from '../../src/lib/data';

const deal: Deal = {
  slug: 'test', asin: 'B001', title: 'Share Test Deal',
  url: 'https://www.amazon.com/dp/B001?tag=noya0b-20',
  price: '$25.00', discount: 40, rating: 'FIRE', category: 'Electronics',
  ts: '2026-03-31T00:00:00Z', type: 'deal', imageUrl: null,
};

describe('Share URLs integration', () => {
  SHARE_TARGETS.forEach((target) => {
    it(`generates valid ${target.name} URL`, () => {
      const url = generateShareUrl(target, deal);
      expect(url).toContain('http');
      expect(url).toContain(encodeURIComponent(deal.url));
    });
  });

  it('all targets have icons', () => {
    SHARE_TARGETS.forEach((t) => {
      expect(t.icon.length).toBeGreaterThan(0);
    });
  });
});
