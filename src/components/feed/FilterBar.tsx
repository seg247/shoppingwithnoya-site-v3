import { useEffect } from 'react';
import { FILTER_CATEGORIES, SORT_OPTIONS } from '../../lib/constants';

export interface FilterState {
  categories: Set<string>;
  sort: string;
}

interface Props {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

const chipBase: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '7px 16px',
  borderRadius: '20px',
  fontSize: '13px',
  fontWeight: 500,
  whiteSpace: 'nowrap',
  border: '1.5px solid var(--color-border)',
  transition: 'all 150ms ease',
  cursor: 'pointer',
  flexShrink: 0,
};

const activeChip: React.CSSProperties = {
  ...chipBase,
  background: 'var(--color-text)',
  color: 'var(--color-bg)',
  borderColor: 'var(--color-text)',
};

const inactiveChip: React.CSSProperties = {
  ...chipBase,
  background: 'var(--color-card)',
  color: 'var(--color-text-secondary)',
};

export default function FilterBar({ filters, onChange }: Props) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cats = params.get('cat');
    const sort = params.get('sort') || 'latest';
    if (cats) {
      const set = new Set(cats.split(','));
      onChange({ categories: set, sort });
    } else if (sort !== filters.sort) {
      onChange({ ...filters, sort });
    }
  }, []);

  const syncUrl = (next: FilterState) => {
    const params = new URLSearchParams();
    if (next.categories.size > 0) params.set('cat', [...next.categories].join(','));
    if (next.sort !== 'latest') params.set('sort', next.sort);
    const qs = params.toString();
    history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname);
  };

  const toggleCategory = (key: string) => {
    if (key === 'all') {
      // "All" clears all filters
      const next = { ...filters, categories: new Set<string>() };
      onChange(next);
      syncUrl(next);
      return;
    }
    const cats = new Set(filters.categories);
    if (cats.has(key)) {
      cats.delete(key);
    } else {
      cats.add(key);
    }
    const next = { ...filters, categories: cats };
    onChange(next);
    syncUrl(next);
  };

  const toggleSort = (key: string) => {
    const next = { ...filters, sort: filters.sort === key ? 'latest' : key };
    onChange(next);
    syncUrl(next);
  };

  const isActive = (key: string) => {
    if (key === 'all') return filters.categories.size === 0;
    return filters.categories.has(key);
  };

  return (
    <div
      role="toolbar"
      aria-label="Filter deals"
      style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        flexWrap: 'wrap',
        padding: '10px var(--spacing-md)',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
      }}
    >
      <style>{`
        [role="toolbar"]::-webkit-scrollbar { display: none; }
        @media (max-width: 640px) {
          [role="toolbar"] { flex-wrap: nowrap !important; }
        }
      `}</style>

      {FILTER_CATEGORIES.map((c) => (
        <button
          key={c.key}
          style={isActive(c.key) ? activeChip : inactiveChip}
          onClick={() => toggleCategory(c.key)}
          aria-pressed={isActive(c.key)}
        >
          {c.label}
        </button>
      ))}

      <span style={{ width: '1px', background: 'var(--color-border)', flexShrink: 0, margin: '4px 0', alignSelf: 'stretch' }} />

      {SORT_OPTIONS.map((s) => (
        <button
          key={s.key}
          style={filters.sort === s.key ? activeChip : inactiveChip}
          onClick={() => toggleSort(s.key)}
          aria-pressed={filters.sort === s.key}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
