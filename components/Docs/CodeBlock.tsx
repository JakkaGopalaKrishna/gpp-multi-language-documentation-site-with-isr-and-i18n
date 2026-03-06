'use client';

import { useState } from 'react';

export default function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div data-testid="code-block" className="relative my-4 rounded-lg bg-slate-950 p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-slate-400 uppercase">{language}</span>
        <button
          data-testid="copy-code-button"
          onClick={onCopy}
          className="text-xs bg-slate-800 hover:bg-slate-700 text-white px-3 py-1 rounded transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto">
        <code className="text-slate-50 text-sm font-mono">{code}</code>
      </pre>
    </div>
  );
}