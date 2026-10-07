import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';

export const metadata: Metadata = {
  title: 'ShipFolio — Build-in-Public Visibility Platform',
  description: 'Turn your raw code, projects, and updates into high-converting social proof on LinkedIn, X, Reddit, and Medium.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#fbfbfd] dark:bg-black text-zinc-900 dark:text-zinc-100 selection:bg-blue-500/20 selection:text-blue-600">
        <Navbar />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
      </body>
    </html>
  );
}
