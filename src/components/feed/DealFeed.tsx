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
import { BookmarkIcon } from '../common/Icons';
import type { Deal } from '../../lib/data';

interface Props {
  initialDeals?: Deal[];
}

export default function DealFeed({ initialDeals }: Props) {
  const { deals, newDeals, loading, error, refresh, mergeNewDeals } = useFeedData();
  const { savedDeals, isSaved, toggleSave } = useSavedDeals();
  const [filters, setFilters] = useState<FilterState>({ category: 'all', sort: 'latest' });
  const [showSearch, setShowSearch] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    const searchHandler = () => setShowSearch((s) => !s);
    const savedHandler = () => setShowSaved((s) => !s);
    window.addEventListener('noya:toggleSearch', searchHandler);
    window.addEventListener('noya:toggleSaved', savedHandler);
    return () => {
      window.removeEventListener('noya:toggleSearch', searchHandler);
      window.removeEventListener('noya:toggleSaved', savedHandler);
    };
  }, []);

  const allDeals = deals.length > 0 ? deals : (initialDeals || []);
  const filtered = showSaved ? savedDeals : filterAndSort(allDeals, filters);
  const { visibleDeals, hasMore, sentinelRef } = useInfiniteScroll(filtered);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    mergeNewDeals();
  };

  return (
    <>
      {showSearch && <SearchOverlay deals={allDeals} onClose={() => setShowSearch(false)} />}

      <PullToRefresh onRefresh={refresh}>
        {/* Saved banner */}
        {showSaved && (
          <div
            style={{
              maxWidth: 'var(--feed-max-width)',
              margin: '0 auto',
              padding: '12px var(--spacing-md) 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookmarkIcon filled size={18} />
              <span style={{ fontWeight: 700, fontSize: '16px' }}>
                Saved Deals ({savedDeals.length})
              </span>
            </div>
            <button
              onClick={() => setShowSaved(false)}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--color-cta)',
                background: 'transparent',
                border: '1.5px solid var(--color-cta)',
              }}
            >
              Back to Feed
            </button>
          </div>
        )}

        {/* Filter bar — hidden when viewing saved */}
        {!showSaved && (
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
        )}

        {!showSaved && <TodaysBest deals={allDeals} />}

        <div
          style={{
            maxWidth: 'var(--feed-max-width)',
            margin: '0 auto',
            padding: '0 var(--spacing-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-lg)',
            paddingBottom: '40px',
            paddingTop: showSaved ? '12px' : '0',
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
          {!hasMore && visibleDeals.length > 0 && !showSaved && <EndOfFeed />}

          {/* Empty states */}
          {showSaved && savedDeals.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--color-text-secondary)' }}>
              <BookmarkIcon size={40} />
              <p style={{ marginTop: '12px', fontSize: '16px', fontWeight: 600 }}>No saved deals yet</p>
              <p style={{ marginTop: '6px', fontSize: '14px' }}>
                Tap the bookmark icon on any deal to save it for later
              </p>
              <button
                onClick={() => setShowSaved(false)}
                style={{
                  marginTop: '16px',
                  padding: '10px 20px',
                  background: 'var(--color-cta)',
                  color: '#fff',
                  borderRadius: '10px',
                  fontWeight: 600,
                  fontSize: '14px',
                }}
              >
                Browse Deals
              </button>
            </div>
          )}

          {!showSaved && !loading && filtered.length === 0 && deals.length > 0 && (
            <p style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-secondary)' }}>
              No deals match your filters
            </p>
          )}
        </div>
      </PullToRefresh>

      {!showSaved && <NewDealsPill count={newDeals.length} onTap={handleScrollTop} />}
    </>
  );
}

export { default as SearchOverlay } from './SearchOverlay';
