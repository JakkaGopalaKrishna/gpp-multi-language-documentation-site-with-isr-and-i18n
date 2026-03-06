import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface HeaderProps {
  locale: string
}

export default function Header({ locale }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.length > 2) {
      // Mock search results
      setSearchResults([
        { title: 'Introduction', url: `/${locale}/docs/v1/introduction` },
        { title: 'API', url: `/${locale}/docs/v1/api` },
      ].filter(item => item.title.toLowerCase().includes(query.toLowerCase())))
    } else {
      setSearchResults([])
    }
  }

  const changeVersion = (newVersion: string) => {
    const newPath = pathname.replace(/\/v\d+/, `/${newVersion}`)
    router.push(newPath)
  }

  const currentVersion = pathname.split('/')[3]

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold">Docs</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
            data-testid="search-input"
          />
          {searchResults.length > 0 && (
            <div className="absolute top-full mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg" data-testid="search-results">
              {searchResults.map((result, index) => (
                <a key={index} href={result.url} className="block px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                  {result.title}
                </a>
              ))}
            </div>
          )}
          {searchQuery.length > 2 && searchResults.length === 0 && (
            <div className="absolute top-full mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg p-3" data-testid="search-no-results">
              No results found
            </div>
          )}
        </div>
        <select
          value={locale}
          onChange={(e) => changeLanguage(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
          data-testid="language-switcher"
        >
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
        </select>
        <select
          value={currentVersion}
          onChange={(e) => changeVersion(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
          data-testid="version-selector"
        >
          <option value="v1">v1</option>
          <option value="v2">v2</option>
          <option value="v3">v3</option>
        </select>
      </div>
    </header>
  )
}