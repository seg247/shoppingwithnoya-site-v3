import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useInfiniteScroll } from '../../src/hooks/useInfiniteScroll';

describe('useInfiniteScroll', () => {
  it('returns first batch', () => {
    const items = Array.from({ length: 50 }, (_, i) => i);
    const { result } = renderHook(() => useInfiniteScroll(items));
    expect(result.current.visibleDeals).toHaveLength(20);
    expect(result.current.hasMore).toBe(true);
  });

  it('returns all when items < batch size', () => {
    const items = Array.from({ length: 5 }, (_, i) => i);
    const { result } = renderHook(() => useInfiniteScroll(items));
    expect(result.current.visibleDeals).toHaveLength(5);
    expect(result.current.hasMore).toBe(false);
  });
});
