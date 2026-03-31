import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useFeedData, filterAndSort } from '../../src/hooks/useFeedData';
import type { Deal } from '../../src/lib/data';

const mockDeals: Deal[] = [
  { slug: 'a', asin: 'A', title: 'A', url: '', price: '$10.00', discount: 50, rating: 'FIRE', category: 'Electronics', ts: '2026-03-31T10:00:00Z', type: 'deal', imageUrl: null },
  { slug: 'b', asin: 'B', title: 'B', url: '', price: '$30.00', discount: 20, rating: 'GOOD', category: 'Beauty', ts: '2026-03-30T10:00:00Z', type: 'deal', imageUrl: null },
  { slug: 'c', asin: 'C', title: 'C', url: '', price: null, discount: 0, rating: 'WARM', category: 'Electronics', ts: '2026-03-29T10:00:00Z', type: 'deal', imageUrl: null },
];

describe('filterAndSort', () => {
  it('filters by category', () => {
    const result = filterAndSort(mockDeals, { category: 'Electronics', maxPrice: 'any', sort: 'latest' });
    expect(result).toHaveLength(2);
  });

  it('filters fire deals', () => {
    const result = filterAndSort(mockDeals, { category: 'fire', maxPrice: 'any', sort: 'latest' });
    expect(result).toHaveLength(1);
    expect(result[0].rating).toBe('FIRE');
  });

  it('filters by max price', () => {
    const result = filterAndSort(mockDeals, { category: 'all', maxPrice: '25', sort: 'latest' });
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe('a');
  });

  it('sorts by discount', () => {
    const result = filterAndSort(mockDeals, { category: 'all', maxPrice: 'any', sort: 'discount' });
    expect(result[0].discount).toBe(50);
  });

  it('sorts by latest', () => {
    const result = filterAndSort(mockDeals, { category: 'all', maxPrice: 'any', sort: 'latest' });
    expect(result[0].slug).toBe('a');
  });
});

describe('useFeedData', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ generatedAt: '2026-03-31T00:00:00Z', total: 3, posts: mockDeals }),
    }));
  });

  it('loads deals on mount', async () => {
    const { result } = renderHook(() => useFeedData());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.deals).toHaveLength(3);
  });
});
