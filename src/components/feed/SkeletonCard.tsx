export default function SkeletonCard() {
  const shimmerBg = {
    background: 'linear-gradient(90deg, var(--color-overlay) 25%, transparent 50%, var(--color-overlay) 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
    borderRadius: 'var(--radius-sm)',
  };

  return (
    <div
      aria-hidden="true"
      style={{
        background: 'var(--color-card)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-card)',
        overflow: 'hidden',
      }}
    >
      <div style={{ ...shimmerBg, aspectRatio: '4/3', borderRadius: 0 }} />
      <div style={{ padding: '12px' }}>
        <div style={{ ...shimmerBg, height: '16px', width: '80%', marginBottom: '8px' }} />
        <div style={{ ...shimmerBg, height: '16px', width: '50%', marginBottom: '12px' }} />
        <div style={{ ...shimmerBg, height: '20px', width: '30%', marginBottom: '12px' }} />
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ ...shimmerBg, height: '48px', flex: 1 }} />
          <div style={{ ...shimmerBg, height: '44px', width: '44px' }} />
          <div style={{ ...shimmerBg, height: '44px', width: '44px' }} />
        </div>
      </div>
    </div>
  );
}
