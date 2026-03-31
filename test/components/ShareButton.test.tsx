import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ShareButton from '../../src/components/common/ShareButton';
import type { Deal } from '../../src/lib/data';

const deal: Deal = {
  slug: 'test', asin: 'B001', title: 'Test', url: 'https://amazon.com/dp/B001',
  price: '$10', discount: 0, rating: 'GOOD', category: 'Electronics',
  ts: new Date().toISOString(), type: 'deal', imageUrl: null,
};

describe('ShareButton', () => {
  it('renders share button', () => {
    render(<ShareButton deal={deal} />);
    expect(screen.getByLabelText('Share this deal')).toBeInTheDocument();
  });

  it('opens menu on click (no native share)', async () => {
    const user = userEvent.setup();
    render(<ShareButton deal={deal} />);
    await user.click(screen.getByLabelText('Share this deal'));
    expect(screen.getByText(/Telegram/)).toBeInTheDocument();
    expect(screen.getByText(/WhatsApp/)).toBeInTheDocument();
    expect(screen.getByText(/Copy Link/)).toBeInTheDocument();
  });

  it('share links have correct URLs', async () => {
    const user = userEvent.setup();
    render(<ShareButton deal={deal} />);
    await user.click(screen.getByLabelText('Share this deal'));
    const telegramLink = screen.getByText(/Telegram/).closest('a');
    expect(telegramLink?.href).toContain('t.me/share/url');
  });
});
