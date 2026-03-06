import { redirect } from 'next/navigation';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function LocaleRootPage({ params }: PageProps) {
  // Next.js 15 requirement: await the params promise
  const { locale } = await params;

  /**
   * Option 1: Automatic Redirect (Recommended)
   * Redirects users landing on /en to /en/docs/v1/introduction
   */
  redirect(`/${locale}/docs/v1/introduction`);

  /* * Option 2: Landing Page (Uncomment if you prefer a Welcome Page)
   * return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl font-bold mb-4">
        {locale === 'en' ? 'Welcome to DocsPortal' : 'Bienvenido a DocsPortal'}
      </h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md">
        Select a version from the sidebar to start exploring our technical documentation.
      </p>
      <a 
        href={`/${locale}/docs/v1/introduction`}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Get Started
      </a>
    </div>
  );
  */
}