import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from '@/components/providers/providers';
import { BottomNav } from '@/components/shared/bottom-nav';
import { WalletSheet } from '@/components/wallet/wallet-sheet';

export const metadata: Metadata = {
  title: 'Badge',
  description: 'Soulbound badge mint on Base.',
  applicationName: 'Badge',
  other: {
    'base:app_id': '69ccdec41aacdcc17b255183',
    'talentapp:project_verification':
      'd49cbe4879c933afae64918236e6dc0656a5140ba6021a93d963f3a439f4459be9b9864f37f800f368a6d03d7c4f49d275a108c0e4cf735b8ba3a783916d9b98',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#0F172A',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="base:app_id" content="69ccdec41aacdcc17b255183" />
        <meta
          name="talentapp:project_verification"
          content="d49cbe4879c933afae64918236e6dc0656a5140ba6021a93d963f3a439f4459be9b9864f37f800f368a6d03d7c4f49d275a108c0e4cf735b8ba3a783916d9b98"
        />
      </head>
      <body>
        <Providers>
          <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-28 pt-4">
            {children}
          </div>
          <WalletSheet />
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}

