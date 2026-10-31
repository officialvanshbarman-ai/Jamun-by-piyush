import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://jamun.example';
  return [
    '',
    'our-story',
    'collection',
    'innovation',
    'leadership',
    'investors',
    'careers',
    'contact',
    'press',
    ...['original', 'signature', 'reserve', 'pro-max', 'infinity'].map(
      (x) => 'collection/' + x,
    ),
  ].map((x) => ({
    url: base + '/' + x,
    changeFrequency: 'monthly',
    priority: x ? 0.7 : 1,
  }));
}
