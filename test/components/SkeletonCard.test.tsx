import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import SkeletonCard from '../../src/components/feed/SkeletonCard';

describe('SkeletonCard', () => {
  it('renders with aria-hidden', () => {
    const { container } = render(<SkeletonCard />);
    expect(container.querySelector('[aria-hidden="true"]')).toBeTruthy();
  });

  it('renders shimmer elements', () => {
    const { container } = render(<SkeletonCard />);
    expect(container.querySelectorAll('div').length).toBeGreaterThan(3);
  });
});
