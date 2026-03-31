import { useState } from 'react';
import type { Deal } from '../../lib/data';
import { rewriteImageUrl } from '../../lib/data';
import { EXPIRED_HOURS } from '../../lib/constants';
import RatingBadge from '../common/RatingBadge';
import PriceDisplay from '../common/PriceDisplay';
import TimeAgo from '../common/TimeAgo';
import CategoryChip from '../common/CategoryChip';
import ShareButton from '../common/ShareButton';
import ImagePlaceholder from './ImagePlaceholder';

interface Props {
  deal: Deal;
  isSaved: boolean;
  onToggleSave: () => void;
}

export default function DealCard({ deal, isSaved, onToggleSave }: Props) {
  const [imgError, setImgError] = useState(false);
  const thumbUrl = rewriteImageUrl(deal.imageUrl, 'thumb');
  const isExpired = (Date.now() - new Date(deal.ts).getTime()) > EXPIRED_HOURS * 3600_000;

  return (
    <article
      style={{
        background: 'var(--color-card)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-card)',
        overflow: 'hidden',
        transition: 'box-shadow var(--transition-normal)',
        opacity: isExpired ? 0.6 : 1,
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {thumbUrl && !imgError ? (
          <img
            src={thumbUrl}
            alt={deal.title}
            loading="lazy"
            onError={() => setImgError(true)}
            style={{
              width: '100%',
              aspectRatio: '4/3',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        ) : (
          <ImagePlaceholder category={deal.category} />
        )}
        {/* Overlays */}
        <div style={{ position: 'absolute', bottom: '8px', left: '8px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          <RatingBadge rating={deal.rating} />
          {deal.discount > 0 && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '2px 8px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 700,
                color: '#fff',
                backgroundColor: 'rgba(0,0,0,0.7)',
              }}
            >
              -{deal.discount}%
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: 'var(--spacing-md)' }}>
        <h3
          style={{
            fontSize: '15px',
            fontWeight: 600,
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            marginBottom: 'var(--spacing-sm)',
          }}
        >
          {deal.title}
        </h3>

        <PriceDisplay price={deal.price} discount={deal.discount} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '8px 0', flexWrap: 'wrap' }}>
          <CategoryChip category={deal.category} />
          <TimeAgo ts={deal.ts} />
        </div>

        {/* Action Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 'var(--spacing-sm)' }}>
          <a
            href={deal.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '48px',
              background: isExpired ? 'var(--color-text-secondary)' : 'var(--color-cta)',
              color: '#fff',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 600,
              fontSize: '14px',
              transition: 'background var(--transition-fast)',
              textDecoration: 'none',
            }}
          >
            {isExpired ? 'May Be Expired' : 'View Deal'}
          </a>
          <ShareButton deal={deal} />
          <button
            onClick={onToggleSave}
            aria-label={isSaved ? 'Remove from saved' : 'Save deal'}
            style={{
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 'var(--radius-sm)',
              fontSize: '18px',
              background: 'var(--color-overlay)',
              transition: 'background var(--transition-fast)',
            }}
          >
            {isSaved ? '🔖' : '🏷️'}
          </button>
        </div>

        {/* FTC Disclosure */}
        <p style={{ fontSize: '10px', color: 'var(--color-text-secondary)', marginTop: '6px' }}>
          #ad
        </p>
      </div>
    </article>
  );
}
