import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterBar from '../../src/components/feed/FilterBar';

describe('FilterBar', () => {
  const defaultFilters = { category: 'all', maxPrice: 'any', sort: 'latest' };

  it('renders all chips', () => {
    render(<FilterBar filters={defaultFilters} onChange={() => {}} />);
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('🔥 Fire Deals')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('Latest')).toBeInTheDocument();
  });

  it('calls onChange on click', async () => {
    const handler = vi.fn();
    const user = userEvent.setup();
    render(<FilterBar filters={defaultFilters} onChange={handler} />);
    await user.click(screen.getByText('Electronics'));
    expect(handler).toHaveBeenCalledWith(expect.objectContaining({ category: 'Electronics' }));
  });

  it('shows active state', () => {
    render(<FilterBar filters={{ ...defaultFilters, category: 'Electronics' }} onChange={() => {}} />);
    const btn = screen.getByText('Electronics');
    expect(btn.getAttribute('aria-pressed')).toBe('true');
  });
});
