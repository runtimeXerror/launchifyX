import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';

export const metadata: Metadata = {
  title: 'LaunchifyX — Build Fast. Launch Faster.',
  description:
    'LaunchifyX — Fast, Modern & Budget-Friendly Web & App Solutions for Startups and Founders.',
  openGraph: {
    title: 'LaunchifyX — Build Fast. Launch Faster.',
    description: 'Fast, Modern & Budget-Friendly Web & App Solutions',
    images: ['/logo.png'],
  },
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },
    ],
    apple: '/logo.png',
    shortcut: '/logo.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#05070f',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" style={{ background:'#0a0906' }}>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
