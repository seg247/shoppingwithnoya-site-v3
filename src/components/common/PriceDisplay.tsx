import { formatPrice, calculateOriginalPrice, calculateSavings } from '../../lib/format';

interface Props {
  price: string | null;
  discount: number;
}

export default function PriceDisplay({ price, discount }: Props) {
  const displayPrice = formatPrice(price);
  const originalPrice = calculateOriginalPrice(price, discount);
  const savings = calculateSavings(price, discount);

  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
      <span
        style={{
          fontSize: '18px',
          fontWeight: 700,
          color: price ? 'var(--color-text)' : 'var(--color-accent)',
        }}
      >
        {displayPrice}
      </span>
      {originalPrice && (
        <span
          style={{
            fontSize: '13px',
            color: 'var(--color-text-secondary)',
            textDecoration: 'line-through',
          }}
        >
          {originalPrice}
        </span>
      )}
      {savings && (
        <span
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--color-fire)',
          }}
        >
          Save {savings}
        </span>
      )}
    </div>
  );
}
