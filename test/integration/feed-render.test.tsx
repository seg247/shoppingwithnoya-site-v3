import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import DealFeed from '../../src/components/feed/DealFeed';
import type { Deal } from '../../src/lib/data';

const mockDeals: Deal[] = [
  { slug: 'deal-1', asin: 'B001', title: 'Test Deal One', url: 'https://amazon.com/dp/B001', price: '$19.99', discount: 30, rating: 'FIRE', category: 'Electronics', ts: new Date().toISOString(), type: 'deal', imageUrl: null },
  { slug: 'deal-2', asin: 'B002', title: 'Test Deal Two', url: 'https://amazon.com/dp/B002', price: '$29.99', discount: 20, rating: 'HOT', category: 'Beauty', ts: new Date().toISOString(), type: 'deal', imageUrl: null },
];

describe('DealFeed integration', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ generatedAt: new Date().toISOString(), total: 2, posts: mockDeals }),
    }));
  });

  it('renders initial deals', () => {
    render(<DealFeed initialDeals={mockDeals} />);
    expect(screen.getAllByText('Test Deal One').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Test Deal Two').length).toBeGreaterThanOrEqual(1);
  });

  it('renders filter bar', () => {
    render(<DealFeed initialDeals={mockDeals} />);
    expect(screen.getByText('All')).toBeInTheDocument();
  });

  it('shows #ad on each card', () => {
    render(<DealFeed initialDeals={mockDeals} />);
    const ads = screen.getAllByText('#ad');
    expect(ads.length).toBe(2);
  });
});
