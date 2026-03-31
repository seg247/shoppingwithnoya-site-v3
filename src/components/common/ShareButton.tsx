import { useState, useRef, useEffect } from 'react';
import type { Deal } from '../../lib/data';
import { SHARE_TARGETS, generateShareUrl, nativeShare, copyToClipboard } from '../../lib/share';

interface Props {
  deal: Deal;
}

export default function ShareButton({ deal }: Props) {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', handler, true);
    return () => document.removeEventListener('click', handler, true);
  }, [open]);

  const handleClick = async () => {
    const shared = await nativeShare(deal);
    if (!shared) setOpen((o) => !o);
  };

  const handleCopy = async () => {
    await copyToClipboard(deal.url);
    setOpen(false);
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={handleClick}
        aria-label="Share this deal"
        style={{
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 'var(--radius-sm)',
          fontSize: '18px',
          transition: 'background var(--transition-fast)',
          background: 'var(--color-overlay)',
        }}
      >
        ↗
      </button>
      {open && (
        <div
          role="menu"
          style={{
            position: 'absolute',
            bottom: '100%',
            right: 0,
            marginBottom: '4px',
            background: 'var(--color-card)',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            padding: '4px 0',
            minWidth: '160px',
            zIndex: 50,
          }}
        >
          {SHARE_TARGETS.map((t) => (
            <a
              key={t.name}
              href={generateShareUrl(t, deal)}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                fontSize: '14px',
                transition: 'background var(--transition-fast)',
              }}
              onClick={() => setOpen(false)}
            >
              {t.icon} {t.name}
            </a>
          ))}
          <button
            role="menuitem"
            onClick={handleCopy}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 12px',
              fontSize: '14px',
              width: '100%',
              textAlign: 'left',
            }}
          >
            📋 Copy Link
          </button>
        </div>
      )}
      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--color-text)',
            color: 'var(--color-bg)',
            padding: '8px 16px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '14px',
            zIndex: 100,
          }}
        >
          Link copied!
        </div>
      )}
    </div>
  );
}
