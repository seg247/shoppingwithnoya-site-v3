import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RatingBadge from '../../src/components/common/RatingBadge';

describe('RatingBadge', () => {
  const ratings = ['FIRE', 'HOT', 'WARM', 'GOOD', 'WORTH A LOOK'];

  ratings.forEach((r) => {
    it(`renders ${r}`, () => {
      render(<RatingBadge rating={r} />);
      expect(screen.getByText(new RegExp(r))).toBeInTheDocument();
    });
  });

  it('handles unknown rating', () => {
    render(<RatingBadge rating="UNKNOWN" />);
    expect(screen.getByText(/DEAL/)).toBeInTheDocument();
  });
});
