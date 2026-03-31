import { useScrollDirection } from '../../hooks/useScrollDirection';
import { useSavedDeals } from '../../hooks/useSavedDeals';
import { TELEGRAM_URL } from '../../lib/constants';

interface Props {
  onSearchClick: () => void;
}

export default function StickyNav({ onSearchClick }: Props) {
  const { direction, isAtTop } = useScrollDirection();
  const { savedCount } = useSavedDeals();
  const visible = direction === 'up' || isAtTop;

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 30,
        height: 'var(--nav-height)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 var(--spacing-md)',
        background: 'rgba(250,250,250,0.8)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-border)',
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform var(--transition-normal)',
      }}
    >
      <a href={import.meta.env.BASE_URL} style={{ fontWeight: 700, fontSize: '16px', textDecoration: 'none' }}>
        🛍️ Noya
      </a>

      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <button
          aria-label={`Saved deals${savedCount > 0 ? ` (${savedCount})` : ''}`}
          style={{
            position: 'relative',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
          }}
        >
          🔖
          {savedCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '2px',
                right: '2px',
                background: 'var(--color-fire)',
                color: '#fff',
                fontSize: '10px',
                fontWeight: 700,
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {savedCount > 9 ? '9+' : savedCount}
            </span>
          )}
        </button>

        <button
          onClick={onSearchClick}
          aria-label="Search deals"
          style={{
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
          }}
        >
          🔍
        </button>

        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 12px',
            background: 'var(--color-cta)',
            color: '#fff',
            borderRadius: '14px',
            fontSize: '12px',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          ✈️ Telegram
        </a>
      </div>
    </nav>
  );
}
