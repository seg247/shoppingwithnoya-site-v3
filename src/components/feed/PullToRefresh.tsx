import { type ReactNode } from 'react';
import { usePullRefresh } from '../../hooks/usePullRefresh';

interface Props {
  onRefresh: () => Promise<void>;
  children: ReactNode;
}

export default function PullToRefresh({ onRefresh, children }: Props) {
  const { state, pullDistance, containerProps } = usePullRefresh(onRefresh);

  return (
    <div {...containerProps} style={{ overscrollBehaviorY: 'contain' }}>
      {/* Spinner */}
      {(state === 'pulling' || state === 'threshold' || state === 'refreshing') && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '12px 0',
            height: `${pullDistance}px`,
            overflow: 'hidden',
            transition: state === 'refreshing' ? 'height 0.3s' : 'none',
          }}
        >
          <div
            style={{
              width: '24px',
              height: '24px',
              border: '3px solid var(--color-border)',
              borderTopColor: 'var(--color-accent)',
              borderRadius: '50%',
              animation: state === 'refreshing' ? 'spin 0.8s linear infinite' : 'none',
              transform: state !== 'refreshing' ? `rotate(${pullDistance * 3}deg)` : undefined,
            }}
          />
        </div>
      )}
      <div
        style={{
          transform: state === 'pulling' || state === 'threshold' ? `translateY(0)` : undefined,
          transition: 'transform 0.2s',
        }}
      >
        {children}
      </div>
    </div>
  );
}
