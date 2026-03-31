import { RATING_CONFIG, DEFAULT_RATING } from '../../lib/constants';

interface Props {
  rating: string;
}

export default function RatingBadge({ rating }: Props) {
  const config = RATING_CONFIG[rating] || DEFAULT_RATING;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '3px',
        padding: '2px 8px',
        borderRadius: '6px',
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.02em',
        color: '#fff',
        backgroundColor: config.color,
        lineHeight: 1.4,
        whiteSpace: 'nowrap',
      }}
      aria-label={`Rating: ${config.label}`}
    >
      {config.emoji} {config.label}
    </span>
  );
}
