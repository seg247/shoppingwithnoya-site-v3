import { useEffect } from 'react';
import { FILTER_CATEGORIES, SORT_OPTIONS } from '../../lib/constants';

export interface FilterState {
  category: string;
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
  // Sync from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('cat') || 'all';
    const sort = params.get('sort') || 'latest';
    if (cat !== filters.category || sort !== filters.sort) {
      onChange({ category: cat, sort });
    }
  }, []);

  const update = (partial: Partial<FilterState>) => {
    const next = { ...filters, ...partial };
    onChange(next);
    const params = new URLSearchParams();
    if (next.category !== 'all') params.set('cat', next.category);
    if (next.sort !== 'latest') params.set('sort', next.sort);
    const qs = params.toString();
    history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname);
  };

  // Toggle: clicking active chip clears it (goes back to default)
  const toggleCategory = (key: string) => {
    if (filters.category === key) {
      update({ category: 'all' });
    } else {
      update({ category: key });
    }
  };

  const toggleSort = (key: string) => {
    if (filters.sort === key) {
      update({ sort: 'latest' });
    } else {
      update({ sort: key });
    }
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
          style={filters.category === c.key ? activeChip : inactiveChip}
          onClick={() => toggleCategory(c.key)}
          aria-pressed={filters.category === c.key}
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
