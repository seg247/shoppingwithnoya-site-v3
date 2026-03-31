import { BASE_PATH } from './constants';

export interface Deal {
  slug: string;
  asin: string;
  title: string;
  url: string;
  price: string | null;
  discount: number;
  rating: string;
  category: string;
  ts: string;
  type: string;
  imageUrl: string | null;
}

export interface SiteData {
  generatedAt: string;
  total: number;
  posts: Deal[];
}

export function rewriteImageUrl(url: string | null, size: 'thumb' | 'full', _asin?: string): string | null {
  // Note: ASIN-based fallback URLs don't work (Amazon uses internal image IDs, not ASINs)
  // Only real scraped imageUrls can be rewritten
  if (!url) return null;
  if (size === 'thumb') {
    return url.replace(/_AC_SR\d+,\d+_/, '_AC_SR300,300_')
      .replace(/_AC_SL\d+_/, '_AC_SR300,300_');
  }
  return url.replace(/_AC_SR\d+,\d+_/, '_AC_SL1500_')
    .replace(/_AC_SL\d+_/, '_AC_SL1500_');
}

export async function fetchDeals(): Promise<SiteData> {
  const res = await fetch(`${BASE_PATH}/site-data.json`);
  if (!res.ok) throw new Error(`Failed to fetch deals: ${res.status}`);
  const data: SiteData = await res.json();
  return data;
}

export async function checkForUpdates(lastGeneratedAt: string): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_PATH}/site-data.json`, { method: 'HEAD' });
    // Can't reliably check generatedAt with HEAD, so always return true to trigger GET
    return res.ok;
  } catch {
    return false;
  }
}
