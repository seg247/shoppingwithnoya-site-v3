import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DealCard from '../../src/components/feed/DealCard';
import type { Deal } from '../../src/lib/data';

const baseDeal: Deal = {
  slug: 'test', asin: 'B001', title: 'Test Product', url: 'https://amazon.com/dp/B001',
  price: '$29.99', discount: 40, rating: 'FIRE', category: 'Electronics',
  ts: new Date().toISOString(), type: 'deal',
  imageUrl: 'https://m.media-amazon.com/images/I/test._AC_SR100,100_.jpg',
};

describe('DealCard', () => {
  it('renders with full data', () => {
    render(<DealCard deal={baseDeal} isSaved={false} onToggleSave={() => {}} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('View Deal')).toBeInTheDocument();
    expect(screen.getByText('#ad')).toBeInTheDocument();
    expect(screen.getByText('-40%')).toBeInTheDocument();
  });

  it('renders with missing price', () => {
    render(<DealCard deal={{ ...baseDeal, price: null, discount: 0 }} isSaved={false} onToggleSave={() => {}} />);
    expect(screen.getByText('See Price on Amazon')).toBeInTheDocument();
  });

  it('renders with missing image', () => {
    render(<DealCard deal={{ ...baseDeal, imageUrl: null }} isSaved={false} onToggleSave={() => {}} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('shows expired state for old deals', () => {
    const old = { ...baseDeal, ts: new Date(Date.now() - 72 * 3600_000).toISOString() };
    render(<DealCard deal={old} isSaved={false} onToggleSave={() => {}} />);
    expect(screen.getByText('May Be Expired')).toBeInTheDocument();
  });

  it('shows saved state', () => {
    render(<DealCard deal={baseDeal} isSaved={true} onToggleSave={() => {}} />);
    expect(screen.getByLabelText('Remove from saved')).toBeInTheDocument();
  });
});
