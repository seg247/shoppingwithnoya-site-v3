import { useScrollDirection } from '../../hooks/useScrollDirection';
import { useSavedDeals } from '../../hooks/useSavedDeals';
import { TELEGRAM_URL } from '../../lib/constants';
import { BookmarkIcon, SearchIcon, SendIcon } from '../common/Icons';

interface Props {
  onSearchClick?: () => void;
}

export default function StickyNav({ onSearchClick }: Props) {
  const { direction, isAtTop } = useScrollDirection();
  const { savedCount } = useSavedDeals();
  const visible = direction === 'up' || isAtTop;

  const handleSearch = () => {
    if (onSearchClick) {
      onSearchClick();
    } else {
      window.dispatchEvent(new CustomEvent('noya:toggleSearch'));
    }
  };

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
        background: 'var(--nav-bg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--color-border)',
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 250ms ease',
      }}
    >
      <a
        href={import.meta.env.BASE_URL}
        style={{
          fontWeight: 700,
          fontSize: '17px',
          textDecoration: 'none',
          color: 'var(--color-text)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        🛍️ <span>Noya</span>
      </a>

      <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
        <button
          aria-label={`Saved deals${savedCount > 0 ? ` (${savedCount})` : ''}`}
          style={{
            position: 'relative',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '10px',
            color: 'var(--color-text-secondary)',
            transition: 'color 150ms',
          }}
        >
          <BookmarkIcon size={20} filled={savedCount > 0} />
          {savedCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '4px',
                right: '3px',
                background: 'var(--color-cta)',
                color: '#fff',
                fontSize: '9px',
                fontWeight: 700,
                minWidth: '15px',
                height: '15px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 3px',
              }}
            >
              {savedCount > 9 ? '9+' : savedCount}
            </span>
          )}
        </button>

        <button
          onClick={handleSearch}
          aria-label="Search deals"
          style={{
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '10px',
            color: 'var(--color-text-secondary)',
            transition: 'color 150ms',
          }}
        >
          <SearchIcon size={20} />
        </button>

        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '6px 14px',
            background: 'var(--color-cta)',
            color: '#fff',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: 600,
            textDecoration: 'none',
            marginLeft: '4px',
            transition: 'opacity 150ms',
          }}
        >
          <SendIcon size={14} />
          <span>Telegram</span>
        </a>
      </div>
    </nav>
  );
}
