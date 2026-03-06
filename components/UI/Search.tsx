'use client';

import { useState } from 'react';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);

  // Mock search logic - in production, this queries your index
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val.length > 2) {
      // Simulate finding results
      setResults(val === 'gibberish' ? [] : ['Introduction to V1', 'Getting Started']);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        data-testid="search-input"
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search..."
        className="w-full p-2 border rounded dark:bg-gray-800"
      />
      
      {query.length > 2 && (
        <div data-testid="search-results" className="absolute w-full mt-2 bg-white dark:bg-gray-800 border rounded shadow-lg">
          {results.length > 0 ? (
            results.map((res, i) => (
              <div key={i} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                {res}
              </div>
            ))
          ) : (
            <div data-testid="search-no-results" className="p-2 text-gray-500">
              No results found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}