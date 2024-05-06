import localFont from 'next/font/local';

export const primary = localFont({
  src: [
    {
      path: '../fonts/InterDisplay-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/InterDisplay-Black.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../fonts/InterDisplay-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../fonts/InterDisplay-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/InterDisplay-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/InterDisplay-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/InterDisplay-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/InterDisplay-ExtraLight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../fonts/InterDisplay-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
  ],
  variable: '--primary',
});
