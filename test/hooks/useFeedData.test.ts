import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useFeedData, filterAndSort } from '../../src/hooks/useFeedData';
import type { Deal } from '../../src/lib/data';

const mockDeals: Deal[] = [
  { slug: 'a', asin: 'A', title: 'A', url: '', price: '$10.00', discount: 50, rating: 'FIRE', category: 'Electronics', ts: '2026-03-31T10:00:00Z', type: 'deal', imageUrl: null },
  { slug: 'b', asin: 'B', title: 'B', url: '', price: '$30.00', discount: 20, rating: 'HOT', category: 'Beauty', ts: '2026-03-30T10:00:00Z', type: 'deal', imageUrl: null },
  { slug: 'c', asin: 'C', title: 'C', url: '', price: null, discount: 0, rating: 'WARM', category: 'Electronics', ts: '2026-03-29T10:00:00Z', type: 'deal', imageUrl: null },
  { slug: 'd', asin: 'D', title: 'D', url: '', price: '$5.00', discount: 10, rating: 'GOOD', category: 'Toys', ts: '2026-03-28T10:00:00Z', type: 'deal', imageUrl: null },
];

describe('filterAndSort', () => {
  it('returns all when no categories selected', () => {
    const result = filterAndSort(mockDeals, { categories: new Set(), sort: 'latest' });
    expect(result).toHaveLength(4);
  });

  it('filters by single category', () => {
    const result = filterAndSort(mockDeals, { categories: new Set(['Electronics']), sort: 'latest' });
    expect(result).toHaveLength(2);
    expect(result.every(d => d.category === 'Electronics')).toBe(true);
  });

  it('filters by multiple categories', () => {
    const result = filterAndSort(mockDeals, { categories: new Set(['Electronics', 'Beauty']), sort: 'latest' });
    expect(result).toHaveLength(3);
  });

  it('fire filter includes FIRE and HOT ratings', () => {
    const result = filterAndSort(mockDeals, { categories: new Set(['fire']), sort: 'latest' });
    expect(result).toHaveLength(2);
    expect(result.every(d => d.rating === 'FIRE' || d.rating === 'HOT')).toBe(true);
  });

  it('fire + category combines correctly', () => {
    const result = filterAndSort(mockDeals, { categories: new Set(['fire', 'Toys']), sort: 'latest' });
    expect(result).toHaveLength(3); // FIRE + HOT + Toys
  });

  it('sorts by discount', () => {
    const result = filterAndSort(mockDeals, { categories: new Set(), sort: 'discount' });
    expect(result[0].discount).toBe(50);
  });

  it('sorts by latest', () => {
    const result = filterAndSort(mockDeals, { categories: new Set(), sort: 'latest' });
    expect(result[0].slug).toBe('a');
  });
});

describe('useFeedData', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ generatedAt: '2026-03-31T00:00:00Z', total: 4, posts: mockDeals }),
    }));
  });

  it('loads deals on mount', async () => {
    const { result } = renderHook(() => useFeedData());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.deals).toHaveLength(4);
  });
});
