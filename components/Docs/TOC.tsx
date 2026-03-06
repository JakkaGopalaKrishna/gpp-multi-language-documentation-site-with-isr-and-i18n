'use client';

import { useEffect, useState } from 'react';

export default function TOC({ headings }: { headings: { id: string; text: string }[] }) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '0% 0% -80% 0%' }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  return (
    <nav data-testid="table-of-contents" className="p-4 sticky top-20">
      <h4 className="font-bold mb-2">On This Page</h4>
      <ul className="space-y-2 text-sm">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              data-testid={`toc-link-${h.id}`}
              data-active={activeId === h.id ? "true" : "false"}
              className={`hover:text-blue-500 ${activeId === h.id ? 'text-blue-600 font-medium' : 'text-gray-500'}`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}