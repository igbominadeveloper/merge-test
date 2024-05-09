import { Metadata } from 'next';
import './globals.css';
import { primary } from '@/fonts';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import MaterialProvider from '@/components/Layout/MaterialProvider';
import NotificationProvider from '@/shared/Notification';
import QueryClientProviderWrapper from '@/providers/queryclient';
import { siteConfig } from '@/config/site';

// Global fonts
const Font = primary;
const pageTitle = 'Katsu MFB';

export const metadata: Metadata = {
  title: {
    template: `%s | ${pageTitle}`, // if you add a page title on a page e.g. Transfer. It will produce Transfer | Katsu MFB
    // https://nextjs.org/docs/app/api-reference/functions/generate-metadata#template

    default: pageTitle, // a default is required when creating a template
  },
  creator: 'katsu',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 310,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: [
      {
        url: siteConfig.favicon16,
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: siteConfig.favicon32,
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    shortcut: siteConfig.favicon16,
    apple: siteConfig.favicon16,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="light relative mx-auto max-w-[1500px]"
      style={{ colorScheme: 'light' }}
    >
      <body className={`${Font.variable} font-primary text-primary-dark `}>
        <QueryClientProviderWrapper>
          <MaterialProvider>
            <NotificationProvider>{children}</NotificationProvider>
          </MaterialProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProviderWrapper>
      </body>
    </html>
  );
}
