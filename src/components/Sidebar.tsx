'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface SidebarProps {
  locale: string
}

export default function Sidebar({ locale }: SidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)

  // For simplicity, hardcode some links
  const links = [
    { slug: 'introduction', title: 'Introduction' },
    { slug: 'api', title: 'API' },
  ]

  const version = pathname.split('/')[3] // assuming /locale/docs/version/slug

  return (
    <aside className={`bg-gray-100 dark:bg-gray-900 w-64 ${isOpen ? '' : 'hidden'} md:block`}>
      <div className="p-4">
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden mb-4">
          Toggle Sidebar
        </button>
        <nav data-testid="sidebar">
          {links.map((link) => (
            <Link
              key={link.slug}
              href={`/${locale}/docs/${version}/${link.slug}`}
              className="block py-2 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
              data-testid={`sidebar-nav-link-${link.slug}`}
            >
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}