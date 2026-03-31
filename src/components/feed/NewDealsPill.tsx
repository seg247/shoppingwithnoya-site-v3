import { useEffect, useState } from 'react';

interface Props {
  count: number;
  onTap: () => void;
}

export default function NewDealsPill({ count, onTap }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 10000);
    return () => clearTimeout(t);
  }, [count]);

  if (!visible || count <= 0) return null;

  return (
    <button
      onClick={onTap}
      style={{
        position: 'fixed',
        top: '60px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 40,
        padding: '8px 16px',
        background: 'var(--color-cta)',
        color: '#fff',
        borderRadius: '20px',
        fontSize: '13px',
        fontWeight: 600,
        boxShadow: '0 4px 12px rgba(37,99,235,0.4)',
        animation: 'bounceIn 0.4s ease-out',
        cursor: 'pointer',
      }}
      aria-label={`${count} new deals, tap to scroll to top`}
    >
      {count} new deal{count > 1 ? 's' : ''} ↑
    </button>
  );
}
