import fs from 'fs';
import path from 'path';
import { getDocData } from '@/lib/docs';
import TOC from '@/components/Docs/TOC';
import Feedback from '@/components/Docs/Feedback';
import Search from '@/components/UI/Search';
import { notFound } from 'next/navigation';

// Requirement 3: Next.js ISR - Revalidate every 60 seconds
export const revalidate = 60; 

// Next.js 15: params must be treated as a Promise
interface PageProps {
  params: Promise<{
    locale: string;
    version: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const docsDirectory = path.join(process.cwd(), '_docs');
  
  if (!fs.existsSync(docsDirectory)) return [];

  const paths: { locale: string; version: string; slug: string }[] = [];
  
  // Read locales (en, es, etc.)
  const locales = fs.readdirSync(docsDirectory);

  for (const locale of locales) {
    const localePath = path.join(docsDirectory, locale);
    if (!fs.statSync(localePath).isDirectory()) continue;

    // Read versions (v1, v2, etc.)
    const versions = fs.readdirSync(localePath);
    for (const version of versions) {
      const versionPath = path.join(localePath, version);
      if (!fs.statSync(versionPath).isDirectory()) continue;

      // Read slugs (introduction.md)
      const files = fs.readdirSync(versionPath);
      for (const file of files) {
        if (file.endsWith('.md')) {
          paths.push({
            locale: locale,   // Matches [locale]
            version: version, // Matches [version]
            slug: file.replace('.md', ''), // Matches [slug]
          });
        }
      }
    }
  }

  return paths;
}

export default async function DocPage({ params }: PageProps) {
  // Requirement: Await params in Next.js 15
  const { locale, version, slug } = await params;

  try {
    const docData = await getDocData(locale, version, slug);

    if (!docData) {
      return notFound();
    }

    return (
      <div className="flex w-full flex-col lg:flex-row">
        {/* Main Content Area (Requirement 4) */}
        <div className="flex-1 min-w-0 px-6 py-10">
          {/* Mobile Search - Visible only on small screens */}
          <div className="mb-8 lg:hidden">
            <Search />
          </div>
          
          <article 
            data-testid="doc-content"
            className="prose dark:prose-invert max-w-none prose-slate"
            dangerouslySetInnerHTML={{ __html: docData.contentHtml }} 
          />
          
          {/* Requirement 12: Feedback mechanism */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
            <Feedback />
          </div>
        </div>

        {/* Desktop Table of Contents (Requirement 11) */}
        <aside className="hidden xl:block w-64 shrink-0 px-4 py-10 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <TOC headings={docData.headings || []} />
        </aside>
      </div>
    );
  } catch (error) {
    console.error("Error fetching document:", error);
    notFound();
  }
}