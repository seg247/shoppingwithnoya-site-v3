import { useState, useCallback, useRef } from 'react';

type PullState = 'idle' | 'pulling' | 'threshold' | 'refreshing' | 'complete';

const THRESHOLD = 60;
const DAMPING = 0.4;

export function usePullRefresh(onRefresh: () => Promise<void>) {
  const [state, setState] = useState<PullState>('idle');
  const [pullDistance, setPullDistance] = useState(0);
  const startY = useRef(0);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (window.scrollY > 0) return;
    startY.current = e.touches[0].clientY;
    setState('idle');
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (startY.current === 0) return;
    const delta = (e.touches[0].clientY - startY.current) * DAMPING;
    if (delta <= 0) { setPullDistance(0); return; }
    setPullDistance(delta);
    setState(delta >= THRESHOLD ? 'threshold' : 'pulling');
  }, []);

  const onTouchEnd = useCallback(async () => {
    if (state === 'threshold') {
      setState('refreshing');
      setPullDistance(THRESHOLD);
      await onRefresh();
      setState('complete');
    }
    setPullDistance(0);
    startY.current = 0;
    setTimeout(() => setState('idle'), 300);
  }, [state, onRefresh]);

  return {
    state,
    pullDistance,
    containerProps: { onTouchStart, onTouchMove, onTouchEnd },
  };
}
