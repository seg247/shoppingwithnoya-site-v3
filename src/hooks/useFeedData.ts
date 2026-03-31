import { useState, useEffect, useCallback, useRef } from 'react';
import type { Deal, SiteData } from '../lib/data';
import { fetchDeals } from '../lib/data';
import { parsePrice } from '../lib/format';
import { POLL_INTERVAL_MS } from '../lib/constants';
import type { FilterState } from '../components/feed/FilterBar';

export function useFeedData() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [newDeals, setNewDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const generatedAtRef = useRef<string>('');

  const load = useCallback(async () => {
    try {
      const data = await fetchDeals();
      if (generatedAtRef.current && data.generatedAt !== generatedAtRef.current) {
        const existingSlugs = new Set(deals.map((d) => d.slug));
        const fresh = data.posts.filter((p) => !existingSlugs.has(p.slug));
        if (fresh.length > 0) setNewDeals(fresh);
      }
      generatedAtRef.current = data.generatedAt;
      setDeals(data.posts);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load deals');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [load]);

  const mergeNewDeals = useCallback(() => {
    setNewDeals([]);
    // deals already updated from latest fetch
  }, []);

  return { deals, newDeals, loading, error, refresh: load, mergeNewDeals };
}

export function filterAndSort(deals: Deal[], filters: FilterState): Deal[] {
  let result = [...deals];

  // Category filter
  if (filters.category === 'fire') {
    result = result.filter((d) => d.rating === 'FIRE');
  } else if (filters.category !== 'all') {
    result = result.filter((d) => d.category === filters.category);
  }

  // Price filter
  if (filters.maxPrice !== 'any') {
    const max = parseInt(filters.maxPrice, 10);
    result = result.filter((d) => {
      const p = parsePrice(d.price);
      return p !== null && p <= max;
    });
  }

  // Sort
  if (filters.sort === 'discount') {
    result.sort((a, b) => b.discount - a.discount);
  } else {
    result.sort((a, b) => new Date(b.ts).getTime() - new Date(a.ts).getTime());
  }

  return result;
}
