import { useState, useEffect, useCallback, useRef } from 'react';
import type { Deal, SiteData } from '../lib/data';
import { fetchDeals } from '../lib/data';
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

  // Category filter — multi-select
  if (filters.categories.size > 0) {
    result = result.filter((d) => {
      // "fire" is a special key matching FIRE + HOT ratings
      if (filters.categories.has('fire') && (d.rating === 'FIRE' || d.rating === 'HOT')) return true;
      // Match by category name
      return filters.categories.has(d.category);
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
