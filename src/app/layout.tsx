import { Metadata } from 'next';
import './globals.css';
import { primary } from '@/fonts';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import MaterialProvider from '@/components/Layout/MaterialProvider';
import NotificationProvider from '@/shared/Notification';
import QueryClientProviderWrapper from '@/providers/queryclient';

// Global fonts
const Font = primary;
const pageTitle = 'Katsu Web App';

export const metadata: Metadata = {
  title: {
    template: `%s | ${pageTitle}`, // if you add a page title on a page e.g. Transfer. It will produce Transfer | Katsu Web App
    // https://nextjs.org/docs/app/api-reference/functions/generate-metadata#template

    default: pageTitle, // a default is required when creating a template
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
