import type { Deal } from '../../lib/data';
import { rewriteImageUrl } from '../../lib/data';

interface Props {
  deals: Deal[];
}

export default function TodaysBest({ deals }: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const qualifying = deals
    .filter((d) => {
      const dt = new Date(d.ts);
      return dt >= today && (d.rating === 'FIRE' || d.rating === 'HOT');
    })
    .slice(0, 5);

  if (qualifying.length === 0) return null;

  return (
    <section style={{ padding: '12px 0' }}>
      <h2 style={{ fontSize: '16px', fontWeight: 700, padding: '0 var(--spacing-md)', marginBottom: '8px' }}>
        🔥 Today's Best
      </h2>
      <div
        style={{
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          padding: '0 var(--spacing-md)',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {qualifying.map((d) => {
          const thumb = rewriteImageUrl(d.imageUrl, 'thumb');
          return (
            <a
              key={d.slug}
              href={d.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              style={{
                flexShrink: 0,
                width: '120px',
                height: '160px',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                background: 'var(--color-card)',
                boxShadow: 'var(--shadow-card)',
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
              }}
            >
              <div
                style={{
                  height: '90px',
                  background: thumb ? `url(${thumb}) center/cover` : 'var(--color-overlay)',
                }}
              />
              <div style={{ padding: '6px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                {d.discount > 0 && (
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-fire)' }}>
                    -{d.discount}%
                  </span>
                )}
                <p
                  style={{
                    fontSize: '11px',
                    lineHeight: 1.2,
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {d.title}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
