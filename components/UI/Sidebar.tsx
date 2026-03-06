import Link from 'next/link';

export default function Sidebar({ version, locale }: { version: string, locale: string }) {
  // Example links - in a real app, these would be dynamic
  const links = [{ slug: 'introduction', label: 'Introduction' }];

  return (
    <aside data-testid="sidebar" className="w-64 border-r h-screen p-4">
      <nav>
        {links.map((link) => (
          <Link 
            key={link.slug}
            href={`/${locale}/docs/${version}/${link.slug}`}
            data-testid={`sidebar-nav-link-${link.slug}`}
            className="block py-2 hover:text-blue-500"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}