// import { redirect } from 'next/navigation';
// Use this type definition to stop "Property does not exist" errors
interface PageProps {
  params: Promise<{
    locale: string;
    version: string;
    slug: string;
  }>;
}

export default async function DocPage({ params }: PageProps) {
  const { locale, version, slug } = await params;
  // ... rest of code
}
// export default function RootPage() {
//   // Redirect to English Version 1 Introduction by default
//   redirect('/en/docs/v1/introduction');
// }