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
import { BookmarkIcon, ExternalLinkIcon } from '../common/Icons';

interface Props {
  deal: Deal;
  isSaved: boolean;
  onToggleSave: () => void;
}

export default function DealCard({ deal, isSaved, onToggleSave }: Props) {
  const [imgError, setImgError] = useState(false);
  const thumbUrl = rewriteImageUrl(deal.imageUrl, 'thumb', deal.asin);
  const isExpired = (Date.now() - new Date(deal.ts).getTime()) > EXPIRED_HOURS * 3600_000;

  return (
    <article
      style={{
        background: 'var(--color-card)',
        borderRadius: '16px',
        boxShadow: 'var(--shadow-card)',
        overflow: 'hidden',
        opacity: isExpired ? 0.6 : 1,
        border: '1px solid var(--color-border)',
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
        <div style={{ position: 'absolute', bottom: '10px', left: '10px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <RatingBadge rating={deal.rating} />
          {deal.discount > 0 && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '3px 10px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 700,
                color: '#fff',
                background: 'rgba(0,0,0,0.65)',
                backdropFilter: 'blur(4px)',
              }}
            >
              -{deal.discount}%
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '14px 16px 16px' }}>
        <h3
          style={{
            fontSize: '15px',
            fontWeight: 600,
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            marginBottom: '8px',
            color: 'var(--color-text)',
          }}
        >
          {deal.title}
        </h3>

        <PriceDisplay price={deal.price} discount={deal.discount} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '10px 0 14px', flexWrap: 'wrap' }}>
          <CategoryChip category={deal.category} />
          <span style={{ color: 'var(--color-text-muted)', fontSize: '12px' }}>·</span>
          <TimeAgo ts={deal.ts} />
        </div>

        {/* Action Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <a
            href={deal.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              height: '44px',
              background: isExpired ? 'var(--color-text-secondary)' : 'var(--color-cta)',
              color: '#fff',
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: '14px',
              textDecoration: 'none',
              transition: 'opacity 150ms',
            }}
          >
            {isExpired ? 'May Be Expired' : (
              <>
                <ExternalLinkIcon size={15} />
                Get This Deal
              </>
            )}
          </a>
          <ShareButton deal={deal} />
          <button
            onClick={onToggleSave}
            aria-label={isSaved ? 'Remove from saved' : 'Save deal'}
            style={{
              width: '42px',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '10px',
              color: isSaved ? 'var(--color-cta)' : 'var(--color-text-secondary)',
              transition: 'all 150ms ease',
              background: 'transparent',
              border: '1.5px solid var(--color-border)',
            }}
          >
            <BookmarkIcon filled={isSaved} size={18} />
          </button>
        </div>

        {/* FTC Disclosure */}
        <p style={{ fontSize: '10px', color: 'var(--color-text-muted)', marginTop: '8px', letterSpacing: '0.02em' }}>
          #ad
        </p>
      </div>
    </article>
  );
}
