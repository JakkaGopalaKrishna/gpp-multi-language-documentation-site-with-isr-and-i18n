'use client'

import { useEffect, useState } from 'react'

interface TOCItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [toc, setToc] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const headings = content.match(/^#{1,6} .+$/gm) || []
    const tocItems: TOCItem[] = headings.map((heading) => {
      const level = heading.match(/^#+/)![0].length
      const text = heading.replace(/^#+\s/, '')
      const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
      return { id, text, level }
    })
    setToc(tocItems)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '0% 0% -80% 0%' }
    )

    tocItems.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [content])

  return (
    <aside className="w-64 ml-8" data-testid="table-of-contents">
      <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
      <ul>
        {toc.map((item) => (
          <li key={item.id} style={{ marginLeft: `${(item.level - 1) * 20}px` }}>
            <a
              href={`#${item.id}`}
              className={`block py-1 text-sm ${activeId === item.id ? 'text-blue-600 font-bold' : 'text-gray-700 dark:text-gray-300'}`}
              data-testid={`toc-link-${item.id}`}
              data-active={activeId === item.id ? 'true' : undefined}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}