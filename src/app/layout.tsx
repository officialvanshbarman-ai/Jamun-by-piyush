import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Shell } from '@/components/layout/Shell';
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://jamun.example',
  ),
  title: { default: 'Jamun™ — Beyond Fruit.', template: '%s | Jamun™' },
  description:
    'The world’s most unnecessarily premium jamun experience. A fictional luxury fruit parody by friends.',
  openGraph: {
    title: 'Jamun™ — Beyond Fruit.',
    description:
      'Engineered by nature. Overpriced by vision. A fictional parody.',
    images: ['/images/editorial/og.jpg'],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
