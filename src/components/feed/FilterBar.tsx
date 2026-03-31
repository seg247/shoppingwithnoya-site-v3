import { useState, useEffect } from 'react';
import { FILTER_CATEGORIES, PRICE_FILTERS, SORT_OPTIONS } from '../../lib/constants';

export interface FilterState {
  category: string;
  maxPrice: string;
  sort: string;
}

interface Props {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

const chipBase: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '6px 14px',
  borderRadius: '20px',
  fontSize: '13px',
  fontWeight: 500,
  whiteSpace: 'nowrap',
  border: '1.5px solid var(--color-border)',
  transition: 'all var(--transition-fast)',
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
  color: 'var(--color-text)',
};

export default function FilterBar({ filters, onChange }: Props) {
  // Sync from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('cat') || 'all';
    const price = params.get('price') || 'any';
    const sort = params.get('sort') || 'latest';
    if (cat !== filters.category || price !== filters.maxPrice || sort !== filters.sort) {
      onChange({ category: cat, maxPrice: price, sort });
    }
  }, []);

  const update = (partial: Partial<FilterState>) => {
    const next = { ...filters, ...partial };
    onChange(next);
    const params = new URLSearchParams();
    if (next.category !== 'all') params.set('cat', next.category);
    if (next.maxPrice !== 'any') params.set('price', next.maxPrice);
    if (next.sort !== 'latest') params.set('sort', next.sort);
    const qs = params.toString();
    history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname);
  };

  return (
    <div
      role="toolbar"
      aria-label="Filter deals"
      style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        padding: '8px var(--spacing-md)',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {FILTER_CATEGORIES.map((c) => (
        <button
          key={c.key}
          style={filters.category === c.key ? activeChip : inactiveChip}
          onClick={() => update({ category: c.key })}
          aria-pressed={filters.category === c.key}
        >
          {c.label}
        </button>
      ))}
      <span style={{ width: '1px', background: 'var(--color-border)', flexShrink: 0, margin: '4px 0' }} />
      {PRICE_FILTERS.map((p) => (
        <button
          key={p.key}
          style={filters.maxPrice === p.key ? activeChip : inactiveChip}
          onClick={() => update({ maxPrice: p.key })}
          aria-pressed={filters.maxPrice === p.key}
        >
          {p.label}
        </button>
      ))}
      <span style={{ width: '1px', background: 'var(--color-border)', flexShrink: 0, margin: '4px 0' }} />
      {SORT_OPTIONS.map((s) => (
        <button
          key={s.key}
          style={filters.sort === s.key ? activeChip : inactiveChip}
          onClick={() => update({ sort: s.key })}
          aria-pressed={filters.sort === s.key}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
