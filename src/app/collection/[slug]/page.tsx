import { notFound } from 'next/navigation';
import { products } from '@/data/content';
import { ProductDetail } from '@/components/sections/Pages';
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title: products.find((p) => p.slug === slug)?.name || 'Not found',
    alternates: { canonical: '/collection/' + slug },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!products.some((p) => p.slug === slug)) notFound();
  return <ProductDetail slug={slug} />;
}
