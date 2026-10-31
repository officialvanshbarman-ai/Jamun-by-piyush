import { notFound } from 'next/navigation';
import {
  Story,
  Collection,
  Leadership,
  Innovation,
  Investors,
  Careers,
  Contact,
  Press,
} from '@/components/sections/Pages';
const pages: Record<string, { component: React.ComponentType; title: string }> =
  {
    'our-story': { component: Story, title: 'Our Story' },
    collection: { component: Collection, title: 'The Collection' },
    leadership: { component: Leadership, title: 'Leadership' },
    innovation: { component: Innovation, title: 'Jamun Labs' },
    investors: { component: Investors, title: 'Fictional Investor Relations' },
    careers: { component: Careers, title: 'Fictional Careers' },
    contact: { component: Contact, title: 'Contact' },
    press: { component: Press, title: 'The Press Room' },
  };
export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title: pages[slug]?.title || 'Page not found',
    alternates: { canonical: '/' + slug },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = pages[slug];
  if (!p) notFound();
  const Component = p.component;
  return <Component />;
}
