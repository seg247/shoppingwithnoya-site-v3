import { useState, useRef, useEffect } from 'react';
import type { Deal } from '../../lib/data';

interface Props {
  deals: Deal[];
  onClose: () => void;
}

export default function SearchOverlay({ deals, onClose }: Props) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const filtered = query.length < 2
    ? []
    : deals.filter((d) =>
        d.title.toLowerCase().includes(query.toLowerCase()) ||
        d.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 20);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 60,
        background: 'var(--color-bg)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px var(--spacing-md)' }}>
        <button onClick={onClose} aria-label="Close search" style={{ fontSize: '20px', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          ←
        </button>
        <input
          ref={inputRef}
          type="search"
          placeholder="Search deals..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            flex: 1,
            height: '44px',
            padding: '0 12px',
            borderRadius: 'var(--radius-sm)',
            border: '1.5px solid var(--color-border)',
            background: 'var(--color-card)',
            color: 'var(--color-text)',
            fontSize: '15px',
            outline: 'none',
          }}
        />
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 var(--spacing-md)' }}>
        {filtered.map((d) => (
          <a
            key={d.slug}
            href={d.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 0',
              borderBottom: '1px solid var(--color-border)',
              textDecoration: 'none',
            }}
          >
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '14px', fontWeight: 500 }}>{d.title}</p>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                {d.category} {d.price ? `· ${d.price}` : ''}
              </p>
            </div>
          </a>
        ))}
        {query.length >= 2 && filtered.length === 0 && (
          <p style={{ textAlign: 'center', padding: '40px 0', color: 'var(--color-text-secondary)' }}>
            No deals found
          </p>
        )}
      </div>
    </div>
  );
}
