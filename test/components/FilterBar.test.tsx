import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterBar from '../../src/components/feed/FilterBar';

describe('FilterBar', () => {
  const defaultFilters = { categories: new Set<string>(), sort: 'latest' };

  it('renders all chips', () => {
    render(<FilterBar filters={defaultFilters} onChange={() => {}} />);
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('🔥 Fire Deals')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('Latest')).toBeInTheDocument();
  });

  it('calls onChange with category added on click', async () => {
    const handler = vi.fn();
    const user = userEvent.setup();
    render(<FilterBar filters={defaultFilters} onChange={handler} />);
    await user.click(screen.getByText('Electronics'));
    expect(handler).toHaveBeenCalledWith(
      expect.objectContaining({ categories: new Set(['Electronics']) })
    );
  });

  it('shows active state for selected categories', () => {
    const filters = { categories: new Set(['Electronics']), sort: 'latest' };
    render(<FilterBar filters={filters} onChange={() => {}} />);
    expect(screen.getByText('Electronics').getAttribute('aria-pressed')).toBe('true');
    expect(screen.getByText('All').getAttribute('aria-pressed')).toBe('false');
  });

  it('toggles off when clicking active filter', async () => {
    const handler = vi.fn();
    const user = userEvent.setup();
    const filters = { categories: new Set(['Electronics']), sort: 'latest' };
    render(<FilterBar filters={filters} onChange={handler} />);
    await user.click(screen.getByText('Electronics'));
    expect(handler).toHaveBeenCalledWith(
      expect.objectContaining({ categories: new Set() })
    );
  });

  it('All clears all selected categories', async () => {
    const handler = vi.fn();
    const user = userEvent.setup();
    const filters = { categories: new Set(['Electronics', 'Beauty']), sort: 'latest' };
    render(<FilterBar filters={filters} onChange={handler} />);
    await user.click(screen.getByText('All'));
    expect(handler).toHaveBeenCalledWith(
      expect.objectContaining({ categories: new Set() })
    );
  });
});
