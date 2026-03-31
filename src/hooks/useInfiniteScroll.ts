import { useState, useRef, useEffect, useCallback } from 'react';
import { BATCH_SIZE } from '../lib/constants';

export function useInfiniteScroll<T>(items: T[]) {
  const [page, setPage] = useState(1);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const visibleDeals = items.slice(0, page * BATCH_SIZE);
  const hasMore = visibleDeals.length < items.length;

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore) {
          setPage((p) => p + 1);
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore]);

  // Reset page when items change significantly
  useEffect(() => {
    setPage(1);
  }, [items.length]);

  return { visibleDeals, hasMore, sentinelRef };
}
