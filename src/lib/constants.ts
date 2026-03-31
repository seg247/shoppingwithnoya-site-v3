export const RATING_CONFIG: Record<string, { color: string; label: string; emoji: string }> = {
  FIRE: { color: '#EF4444', label: 'FIRE', emoji: '🔥' },
  HOT: { color: '#F97316', label: 'HOT', emoji: '🌶️' },
  WARM: { color: '#EAB308', label: 'WARM', emoji: '☀️' },
  GOOD: { color: '#22C55E', label: 'GOOD', emoji: '👍' },
  'WORTH A LOOK': { color: '#94A3B8', label: 'WORTH A LOOK', emoji: '👀' },
};

export const DEFAULT_RATING = { color: '#94A3B8', label: 'DEAL', emoji: '🏷️' };

export const CATEGORIES = [
  'Electronics',
  'Home & Kitchen',
  'Beauty',
  'Fashion',
  'Toys',
  'Sports',
  'Pet Supplies',
  "Today's Deal",
  'Health & Household',
  'Automotive',
  'Tools & Home Improvement',
  'Office Products',
  'Baby',
  'Grocery',
] as const;

export const CATEGORY_GRADIENTS: Record<string, string> = {
  Electronics: 'linear-gradient(135deg, #667eea, #764ba2)',
  'Home & Kitchen': 'linear-gradient(135deg, #f093fb, #f5576c)',
  Beauty: 'linear-gradient(135deg, #4facfe, #00f2fe)',
  Fashion: 'linear-gradient(135deg, #43e97b, #38f9d7)',
  Toys: 'linear-gradient(135deg, #fa709a, #fee140)',
  Sports: 'linear-gradient(135deg, #a18cd1, #fbc2eb)',
  'Pet Supplies': 'linear-gradient(135deg, #fccb90, #d57eeb)',
  "Today's Deal": 'linear-gradient(135deg, #ff9a9e, #fad0c4)',
};

export const CATEGORY_EMOJI: Record<string, string> = {
  Electronics: '📱',
  'Home & Kitchen': '🏠',
  Beauty: '💄',
  Fashion: '👗',
  Toys: '🧸',
  Sports: '⚽',
  'Pet Supplies': '🐾',
  "Today's Deal": '🏷️',
  'Health & Household': '💊',
  Automotive: '🚗',
  'Tools & Home Improvement': '🔧',
  'Office Products': '📎',
  Baby: '👶',
  Grocery: '🛒',
};

export const FILTER_CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'fire', label: '🔥 Fire Deals' },
  { key: 'Electronics', label: 'Electronics' },
  { key: 'Home & Kitchen', label: 'Home & Kitchen' },
  { key: 'Beauty', label: 'Beauty' },
  { key: 'Fashion', label: 'Fashion' },
  { key: 'Toys', label: 'Toys' },
  { key: 'Sports', label: 'Sports' },
  { key: 'Pet Supplies', label: 'Pet Supplies' },
] as const;

export const PRICE_FILTERS = [
  { key: 'any', label: 'Any Price' },
  { key: '25', label: 'Under $25' },
  { key: '50', label: 'Under $50' },
  { key: '100', label: 'Under $100' },
] as const;

export const SORT_OPTIONS = [
  { key: 'latest', label: 'Latest' },
  { key: 'discount', label: 'Biggest Discount' },
] as const;

export const BASE_PATH = '/shoppingwithnoya-site-v3';
export const TELEGRAM_URL = 'https://t.me/shoppingwithnoya';
export const SITE_NAME = 'Shopping With Noya';
export const BATCH_SIZE = 20;
export const POLL_INTERVAL_MS = 60_000;
export const EXPIRED_HOURS = 48;
