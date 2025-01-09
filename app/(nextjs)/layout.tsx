import '@/app/(nextjs)/tailwind.css';
import classNames from 'classnames';
import {Metadata, Viewport} from 'next';
import {FC, ReactNode} from 'react';

export const metadata: Metadata = {
  manifest: '/favicons/site.webmanifest',
  icons: {
    icon: '/favicons/favicon-96x96.png',
    shortcut: '/favicons/favicon.ico',
    apple: '/favicons/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

const Layout: FC<{children: ReactNode}> = async ({children}) => {
  return (
    <html lang='de' className='min-h-[100dvh] no-scrollbar'>
      <body className={classNames('relative flex flex-col min-h-[100dvh]')}>{children}</body>
    </html>
  );
};

export default Layout;
