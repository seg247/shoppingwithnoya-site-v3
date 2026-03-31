import { BASE_PATH } from './constants';
import type { Deal } from './data';

export interface ShareTarget {
  name: string;
  icon: string;
  getUrl: (deal: Deal) => string;
}

export const SHARE_TARGETS: ShareTarget[] = [
  {
    name: 'Telegram',
    icon: '✈️',
    getUrl: (deal) => `https://t.me/share/url?url=${enc(deal.url)}&text=${enc(deal.title)}`,
  },
  {
    name: 'WhatsApp',
    icon: '💬',
    getUrl: (deal) => `https://wa.me/?text=${enc(`${deal.title} ${deal.url}`)}`,
  },
  {
    name: 'Facebook',
    icon: '📘',
    getUrl: (deal) => `https://www.facebook.com/sharer/sharer.php?u=${enc(deal.url)}`,
  },
  {
    name: 'Instagram',
    icon: '📷',
    getUrl: (deal) => `https://www.instagram.com/?url=${enc(deal.url)}`,
  },
];

function enc(s: string): string {
  return encodeURIComponent(s);
}

export function generateShareUrl(target: ShareTarget, deal: Deal): string {
  return target.getUrl(deal);
}

export async function nativeShare(deal: Deal): Promise<boolean> {
  if (!navigator.share) return false;
  try {
    await navigator.share({
      title: deal.title,
      text: `${deal.title}${deal.price ? ` - ${deal.price}` : ''}`,
      url: deal.url,
    });
    return true;
  } catch {
    return false;
  }
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}
