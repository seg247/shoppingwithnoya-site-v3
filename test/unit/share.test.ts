import { describe, it, expect } from 'vitest';
import { SHARE_TARGETS, generateShareUrl } from '../../src/lib/share';
import type { Deal } from '../../src/lib/data';

const mockDeal: Deal = {
  slug: 'test-deal',
  asin: 'B001',
  title: 'Test Deal',
  url: 'https://www.amazon.com/dp/B001?tag=noya0b-20',
  price: '$19.99',
  discount: 30,
  rating: 'FIRE',
  category: 'Electronics',
  ts: '2026-03-31T10:00:00.000Z',
  type: 'deal',
  imageUrl: null,
};

describe('SHARE_TARGETS', () => {
  it('has Telegram, WhatsApp, Facebook, Instagram', () => {
    const names = SHARE_TARGETS.map((t) => t.name);
    expect(names).toContain('Telegram');
    expect(names).toContain('WhatsApp');
    expect(names).toContain('Facebook');
    expect(names).toContain('Instagram');
  });
});

describe('generateShareUrl', () => {
  it('generates Telegram URL', () => {
    const telegram = SHARE_TARGETS.find((t) => t.name === 'Telegram')!;
    const url = generateShareUrl(telegram, mockDeal);
    expect(url).toContain('t.me/share/url');
    expect(url).toContain(encodeURIComponent(mockDeal.url));
  });

  it('generates WhatsApp URL', () => {
    const wa = SHARE_TARGETS.find((t) => t.name === 'WhatsApp')!;
    const url = generateShareUrl(wa, mockDeal);
    expect(url).toContain('wa.me');
  });

  it('generates Facebook URL', () => {
    const fb = SHARE_TARGETS.find((t) => t.name === 'Facebook')!;
    const url = generateShareUrl(fb, mockDeal);
    expect(url).toContain('facebook.com/sharer');
  });
});
