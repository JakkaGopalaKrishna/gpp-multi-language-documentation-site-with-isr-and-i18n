'use client';

import Search from './Search';
import LangSwitcher from './LangSwitcher';
import ThemeToggle from './ThemeToggle';
export default function Header({ locale }: { locale: string }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-slate-950/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold tracking-tight">DocsPortal</span>
        </div>
        <div className="flex items-center gap-4">
          {/* Ensure your SVG icons inside these have 'h-5 w-5' classes */}
          <Search />
          <LangSwitcher locale={locale} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}