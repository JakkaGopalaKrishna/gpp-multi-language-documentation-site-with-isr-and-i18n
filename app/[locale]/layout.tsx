import '@/styles/globals.css';
import { Providers } from '@/components/UI/Providers';
import Header from '@/components/UI/Header';
import Sidebar from '@/components/UI/Sidebar';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({ children, params }: LayoutProps) {
  // Next.js 15 requirement: Await the params promise
  const { locale } = await params;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100`}>
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            {/* Sticky Header */}
            <Header locale={locale} />

            <div className="flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] lg:grid-cols-[280px_minmax(0,1fr)]">
              {/* Sidebar: Fixed on Desktop, Hidden on Mobile (handled via Sidebar component classes) */}
              <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block overflow-y-auto border-r border-slate-200 dark:border-slate-800">
                <Sidebar locale={locale} version="v1" />
              </aside>

              {/* Main Content Area */}
              <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
                <div className="mx-auto w-full min-w-0">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}