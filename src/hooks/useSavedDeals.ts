import { useState, useCallback, useEffect } from 'react';
import type { Deal } from '../lib/data';

const STORAGE_KEY = 'noya_saved_deals';

function loadSaved(): Deal[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useSavedDeals() {
  const [savedDeals, setSavedDeals] = useState<Deal[]>(() => loadSaved());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedDeals));
  }, [savedDeals]);

  const isSaved = useCallback(
    (slug: string) => savedDeals.some((d) => d.slug === slug),
    [savedDeals]
  );

  const toggleSave = useCallback((deal: Deal) => {
    setSavedDeals((prev) => {
      const exists = prev.some((d) => d.slug === deal.slug);
      if (exists) return prev.filter((d) => d.slug !== deal.slug);
      return [deal, ...prev];
    });
  }, []);

  return { savedDeals, savedCount: savedDeals.length, isSaved, toggleSave };
}
