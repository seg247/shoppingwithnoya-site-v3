export function parsePrice(price: string | null): number | null {
  if (!price) return null;
  const match = price.replace(/[^0-9.]/g, '');
  const num = parseFloat(match);
  return isNaN(num) ? null : num;
}

export function formatPrice(price: string | null): string {
  if (!price) return 'See Price on Amazon';
  return price.startsWith('$') ? price : `$${price}`;
}

export function formatTimeAgo(ts: string): string {
  const now = Date.now();
  const then = new Date(ts).getTime();
  const diffMs = now - then;
  if (diffMs < 0) return 'just now';
  const seconds = Math.floor(diffMs / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  return `${weeks}w ago`;
}

export function truncateTitle(title: string, maxLen = 80): string {
  if (title.length <= maxLen) return title;
  return title.slice(0, maxLen).trimEnd() + '…';
}

export function calculateOriginalPrice(price: string | null, discount: number): string | null {
  if (!price || discount <= 0) return null;
  const parsed = parsePrice(price);
  if (!parsed) return null;
  const original = parsed / (1 - discount / 100);
  return `$${original.toFixed(2)}`;
}

export function calculateSavings(price: string | null, discount: number): string | null {
  if (!price || discount <= 0) return null;
  const parsed = parsePrice(price);
  if (!parsed) return null;
  const original = parsed / (1 - discount / 100);
  const saved = original - parsed;
  return `$${saved.toFixed(2)}`;
}
