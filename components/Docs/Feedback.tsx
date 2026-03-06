'use client';

import { useState } from 'react';

export default function Feedback() {
  const [submitted, setSubmitted] = useState(false);
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) setSubmitted(true);
  };

  return (
    <div className="mt-10 p-6 border rounded-lg bg-gray-50 dark:bg-gray-800">
      {submitted ? (
        <p data-testid="feedback-success-message" className="text-green-600">
          Thank you for your feedback!
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h4 className="font-semibold">Was this page helpful?</h4>
          <textarea
            data-testid="feedback-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Tell us more..."
            className="w-full p-2 border rounded dark:text-black"
          />
          <button
            type="submit"
            data-testid="feedback-submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit Feedback
          </button>
        </form>
      )}
    </div>
  );
}