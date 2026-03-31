import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const categories = [
  'Electronics', 'Home & Kitchen', 'Beauty', 'Fashion', 'Toys',
  'Sports', 'Pet Supplies', "Today's Deal", 'Health & Household',
  'Automotive', 'Tools & Home Improvement', 'Office Products', 'Baby', 'Grocery',
];

export const GET: APIRoute = async ({ site }) => {
  const base = '/shoppingwithnoya-site-v3';
  const origin = site?.origin || 'https://seg247.github.io';
  const raw = fs.readFileSync(path.join(process.cwd(), 'public', 'site-data.json'), 'utf-8');
  const data = JSON.parse(raw);

  const urls: string[] = [`${origin}${base}/`];

  for (const post of data.posts) {
    urls.push(`${origin}${base}/deals/${post.slug}/`);
  }

  for (const cat of categories) {
    urls.push(`${origin}${base}/category/${slugify(cat)}/`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
