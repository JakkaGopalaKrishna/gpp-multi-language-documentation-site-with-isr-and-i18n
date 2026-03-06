'use client';

import { useRouter, usePathname } from 'next/navigation';

export default function LangSwitcher({ locale }: { locale: string }) {
  const router = useRouter();
  const pathname = usePathname();

  // Supported locales as per Requirement 5
  const locales = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' }
  ];

  const handleLocaleChange = (newLocale: string) => {
    // pathname format is /[locale]/docs/[version]/[slug]
    const segments = pathname.split('/');
    
    // Replace the locale segment (index 1) with the new selection
    segments[1] = newLocale;
    
    const newPath = segments.join('/');
    router.push(newPath);
  };

  return (
    <div className="relative inline-block">
      <select
        data-testid="language-switcher"
        value={locale}
        onChange={(e) => handleLocaleChange(e.target.value)}
        className="appearance-none bg-transparent border border-slate-300 dark:border-slate-700 rounded-md py-1 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
      >
        {locales.map((l) => (
          <option key={l.code} value={l.code} className="dark:bg-slate-900">
            {l.label}
          </option>
        ))}
      </select>
      {/* Custom dropdown arrow icon */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
        {/* Find your SVG and add 'w-5 h-5' (or similar size) */}
        <svg className="w-6 h-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}