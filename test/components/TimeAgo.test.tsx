import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TimeAgo from '../../src/components/common/TimeAgo';

describe('TimeAgo', () => {
  it('shows just now', () => {
    render(<TimeAgo ts={new Date().toISOString()} />);
    expect(screen.getByText('just now')).toBeInTheDocument();
  });

  it('shows hours ago', () => {
    const ts = new Date(Date.now() - 5 * 3600_000).toISOString();
    render(<TimeAgo ts={ts} />);
    expect(screen.getByText('5h ago')).toBeInTheDocument();
  });

  it('shows days ago', () => {
    const ts = new Date(Date.now() - 3 * 86400_000).toISOString();
    render(<TimeAgo ts={ts} />);
    expect(screen.getByText('3d ago')).toBeInTheDocument();
  });
});
