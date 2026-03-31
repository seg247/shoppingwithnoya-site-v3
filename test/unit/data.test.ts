import { describe, it, expect, vi } from 'vitest';
import { rewriteImageUrl } from '../../src/lib/data';

describe('rewriteImageUrl', () => {
  it('rewrites to thumb', () => {
    const url = 'https://m.media-amazon.com/images/I/test._AC_SR100,100_.jpg';
    expect(rewriteImageUrl(url, 'thumb')).toBe('https://m.media-amazon.com/images/I/test._AC_SR300,300_.jpg');
  });
  it('rewrites to full', () => {
    const url = 'https://m.media-amazon.com/images/I/test._AC_SR100,100_.jpg';
    expect(rewriteImageUrl(url, 'full')).toBe('https://m.media-amazon.com/images/I/test._AC_SL1500_.jpg');
  });
  it('returns null for null', () => {
    expect(rewriteImageUrl(null, 'thumb')).toBeNull();
  });
  it('generates fallback from ASIN when imageUrl is null', () => {
    expect(rewriteImageUrl(null, 'thumb', 'B08T83MCC8')).toBe(
      'https://m.media-amazon.com/images/I/B08T83MCC8._AC_SR300,300_.jpg'
    );
    expect(rewriteImageUrl(null, 'full', 'B08T83MCC8')).toBe(
      'https://m.media-amazon.com/images/I/B08T83MCC8._AC_SL1500_.jpg'
    );
  });
  it('returns null when no imageUrl and no asin', () => {
    expect(rewriteImageUrl(null, 'thumb')).toBeNull();
    expect(rewriteImageUrl(null, 'thumb', undefined)).toBeNull();
  });
  it('handles urls without size suffix', () => {
    const url = 'https://m.media-amazon.com/images/I/test.jpg';
    expect(rewriteImageUrl(url, 'thumb')).toBe(url);
  });
});

describe('fetchDeals', () => {
  it('parses valid data', async () => {
    const mockData = { generatedAt: '2026-01-01T00:00:00Z', total: 1, posts: [{ slug: 'test', title: 'Test' }] };
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    }));
    const { fetchDeals } = await import('../../src/lib/data');
    const data = await fetchDeals();
    expect(data.total).toBe(1);
    expect(data.posts[0].slug).toBe('test');
    vi.unstubAllGlobals();
  });

  it('throws on error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }));
    const { fetchDeals } = await import('../../src/lib/data');
    await expect(fetchDeals()).rejects.toThrow();
    vi.unstubAllGlobals();
  });
});
