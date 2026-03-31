import { CATEGORY_EMOJI } from '../../lib/constants';

interface Props {
  category: string;
}

export default function CategoryChip({ category }: Props) {
  const emoji = CATEGORY_EMOJI[category] || '🏷️';
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '2px 10px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 500,
        color: 'var(--color-text-secondary)',
        backgroundColor: 'var(--color-overlay)',
      }}
    >
      {emoji} {category}
    </span>
  );
}
