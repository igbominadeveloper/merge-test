const baseUrl = 'https://app.katsumfb.com';

export const siteConfig = {
  name: 'Katsu MFB',
  url: baseUrl,
  ogImage: `${baseUrl}/image/og-image.png`,
  description: 'Katsu Microfinance Bank',
  links: {
    twitter: '',
  },
  favicon16: '/image/favicon-16.png',
  favicon32: '/image/favicon-32.png',
};

export type SiteConfig = typeof siteConfig;
