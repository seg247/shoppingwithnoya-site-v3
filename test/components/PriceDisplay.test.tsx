import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PriceDisplay from '../../src/components/common/PriceDisplay';

describe('PriceDisplay', () => {
  it('shows price', () => {
    render(<PriceDisplay price="$19.99" discount={30} />);
    expect(screen.getByText('$19.99')).toBeInTheDocument();
  });

  it('shows strikethrough original', () => {
    render(<PriceDisplay price="$20.00" discount={50} />);
    expect(screen.getByText('$40.00')).toBeInTheDocument();
  });

  it('shows savings', () => {
    render(<PriceDisplay price="$20.00" discount={50} />);
    expect(screen.getByText(/Save \$20\.00/)).toBeInTheDocument();
  });

  it('handles null price', () => {
    render(<PriceDisplay price={null} discount={0} />);
    expect(screen.getByText('See Price on Amazon')).toBeInTheDocument();
  });

  it('no strikethrough when no discount', () => {
    const { container } = render(<PriceDisplay price="$10.00" discount={0} />);
    const strikethrough = container.querySelector('[style*="line-through"]');
    expect(strikethrough).toBeNull();
  });
});
