import { TELEGRAM_URL } from '../../lib/constants';

export default function EndOfFeed() {
  return (
    <div style={{ textAlign: 'center', padding: '40px var(--spacing-md)' }}>
      <p style={{ fontSize: '24px', marginBottom: '8px' }}>🎉</p>
      <p style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>You're all caught up!</p>
      <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
        Join our Telegram for instant deal alerts
      </p>
      <a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '10px 20px',
          background: 'var(--color-cta)',
          color: '#fff',
          borderRadius: 'var(--radius-sm)',
          fontWeight: 600,
          fontSize: '14px',
          textDecoration: 'none',
        }}
      >
        ✈️ Join Telegram
      </a>
    </div>
  );
}
