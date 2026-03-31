import { useState, useEffect } from 'react';
import { useFeedData, filterAndSort } from '../../hooks/useFeedData';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { useSavedDeals } from '../../hooks/useSavedDeals';
import FilterBar, { type FilterState } from './FilterBar';
import TodaysBest from './TodaysBest';
import DealCard from './DealCard';
import SkeletonCard from './SkeletonCard';
import EndOfFeed from './EndOfFeed';
import NewDealsPill from './NewDealsPill';
import PullToRefresh from './PullToRefresh';
import SearchOverlay from './SearchOverlay';
import type { Deal } from '../../lib/data';

interface Props {
  initialDeals?: Deal[];
}

export default function DealFeed({ initialDeals }: Props) {
  const { deals, newDeals, loading, error, refresh, mergeNewDeals } = useFeedData();
  const { isSaved, toggleSave } = useSavedDeals();
  const [filters, setFilters] = useState<FilterState>({ category: 'all', maxPrice: 'any', sort: 'latest' });
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const handler = () => setShowSearch((s) => !s);
    window.addEventListener('noya:toggleSearch', handler);
    return () => window.removeEventListener('noya:toggleSearch', handler);
  }, []);

  const allDeals = deals.length > 0 ? deals : (initialDeals || []);
  const filtered = filterAndSort(allDeals, filters);
  const { visibleDeals, hasMore, sentinelRef } = useInfiniteScroll(filtered);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    mergeNewDeals();
  };

  return (
    <>
      {showSearch && <SearchOverlay deals={allDeals} onClose={() => setShowSearch(false)} />}

      <PullToRefresh onRefresh={refresh}>
        <div
          style={{
            position: 'sticky',
            top: 'var(--nav-height)',
            zIndex: 20,
            background: 'var(--color-bg)',
          }}
        >
          <FilterBar filters={filters} onChange={setFilters} />
        </div>

        <TodaysBest deals={allDeals} />

        <div
          style={{
            maxWidth: 'var(--feed-max-width)',
            margin: '0 auto',
            padding: '0 var(--spacing-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-lg)',
            paddingBottom: '40px',
          }}
        >
          {loading && deals.length === 0 && (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          )}

          {error && deals.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-fire)' }}>
              <p>{error}</p>
              <button
                onClick={refresh}
                style={{
                  marginTop: '12px',
                  padding: '8px 16px',
                  background: 'var(--color-cta)',
                  color: '#fff',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 600,
                }}
              >
                Retry
              </button>
            </div>
          )}

          {visibleDeals.map((deal) => (
            <DealCard
              key={deal.slug}
              deal={deal}
              isSaved={isSaved(deal.slug)}
              onToggleSave={() => toggleSave(deal)}
            />
          ))}

          {hasMore && <div ref={sentinelRef} style={{ height: '1px' }} />}
          {!hasMore && visibleDeals.length > 0 && <EndOfFeed />}
          {!loading && filtered.length === 0 && deals.length > 0 && (
            <p style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-secondary)' }}>
              No deals match your filters
            </p>
          )}
        </div>
      </PullToRefresh>

      <NewDealsPill count={newDeals.length} onTap={handleScrollTop} />
    </>
  );
}

// Export for search button access from nav
export { default as SearchOverlay } from './SearchOverlay';
