import { CATEGORY_EMOJI, CATEGORY_GRADIENTS } from '../../lib/constants';

interface Props {
  category: string;
}

export default function ImagePlaceholder({ category }: Props) {
  const emoji = CATEGORY_EMOJI[category] || '🏷️';
  const gradient = CATEGORY_GRADIENTS[category] || 'linear-gradient(135deg, #667eea, #764ba2)';

  return (
    <div
      style={{
        width: '100%',
        aspectRatio: '4/3',
        background: gradient,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '48px',
      }}
      aria-hidden="true"
    >
      {emoji}
    </div>
  );
}
