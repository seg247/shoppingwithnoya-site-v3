import { useState, useRef, useEffect } from 'react';
import type { Deal } from '../../lib/data';
import { SHARE_TARGETS, generateShareUrl, nativeShare, copyToClipboard } from '../../lib/share';
import { ShareIcon } from './Icons';

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
          width: '42px',
          height: '42px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '10px',
          color: 'var(--color-text-secondary)',
          transition: 'all 150ms ease',
          background: 'transparent',
          border: '1.5px solid var(--color-border)',
        }}
      >
        <ShareIcon size={18} />
      </button>
      {open && (
        <div
          role="menu"
          style={{
            position: 'absolute',
            bottom: '100%',
            right: 0,
            marginBottom: '6px',
            background: 'var(--color-card)',
            borderRadius: '12px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid var(--color-border)',
            padding: '6px',
            minWidth: '180px',
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
                gap: '10px',
                padding: '10px 12px',
                fontSize: '14px',
                borderRadius: '8px',
                color: 'var(--color-text)',
                textDecoration: 'none',
                transition: 'background 100ms',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-overlay)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              onClick={() => setOpen(false)}
            >
              <span style={{ fontSize: '16px', width: '20px', textAlign: 'center' }}>{t.icon}</span>
              <span>{t.name}</span>
            </a>
          ))}
          <button
            role="menuitem"
            onClick={handleCopy}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 12px',
              fontSize: '14px',
              width: '100%',
              textAlign: 'left',
              borderRadius: '8px',
              color: 'var(--color-text)',
              transition: 'background 100ms',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-overlay)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <span style={{ fontSize: '16px', width: '20px', textAlign: 'center' }}>🔗</span>
            <span>Copy Link</span>
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
            padding: '10px 20px',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: 500,
            zIndex: 100,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >
          ✓ Link copied!
        </div>
      )}
    </div>
  );
}
